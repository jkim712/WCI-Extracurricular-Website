from yaml import safe_load as yaml_load
from os import listdir
from os.path import join as path_join
from json import dump as json_dump

athletics = []
sportDirectory = "data/athletics"

# TODO: make resilient to typos and missing data
for sportFilename in listdir(sportDirectory):
    if not (sportFilename[-4:] == ".yml" or sportFilename[-5:] == ".yaml"):
        continue
    with open(path_join(sportDirectory, sportFilename)) as eventFile:
        sport = yaml_load(eventFile)

    connectionLinks = ["more_info"]
    connectionLinkVals = {}

    for connectionLink in sport["connection-links"]:
        connectionLinks.append(connectionLink["type"])
        connectionLinkVals[connectionLink["type"]] = connectionLink["value"]

    # TODO: Accuire button-type links automatically
    connectionLinks.sort(key=lambda link: (1 if link in ["website", "more_info"] else 0))
    
    final_dict = dict({"connection_links": connectionLinks}, **connectionLinkVals)
    for originalLabel, newLabel in {"name": "name", "image": "image", "coach": "coach", "description": "description", "practice-time": "meeting_time", "practice-time-label": "meeting_time_title", "categories": "categories"}.items():
        final_dict[newLabel] = sport[originalLabel]

    # TODO: Add team members
    athletics.append(final_dict)

with open("data/athletics.json", "w") as sportsJSON:
    json_dump(athletics, sportsJSON, indent=4)