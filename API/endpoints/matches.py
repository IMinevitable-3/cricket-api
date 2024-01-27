import json
from config.base import APIcaller
from config.headers import Headers
from config.exceptions import HTMLException
from config import MATCHES_URL
import requests
from bs4 import BeautifulSoup


class Matches(APIcaller):
    """endpoint for getting match IDs"""

    def getHTML(self, uri: str) -> None:
        try:
            resp = requests.get(
                uri,
                headers={
                    "User-Agent": Headers().user_agent(),
                },
            )
            if resp.status_code != 200:
                raise HTMLException(
                    f"request failed with status code {resp.status_code}"
                )
            self.parseDoc(resp.text)
        except Exception as e:
            print(e)

    def parseDoc(self, content: str) -> list:
        soup = BeautifulSoup(content, "html.parser")
        a_tags_with_span = soup.find_all("a")
        result = []

        for a_tag in a_tags_with_span:
            try:
                href = a_tag["href"]
                match_id = href.split("/")[-2]
                match_name = a_tag.find("span", class_="cb-mm-mtch-tm").text

                match_info = {"matchid": match_id, "matchname": match_name}
                result.append(match_info)
            except Exception as e:
                pass
        return result

    def jsonConversion(self, content: list) -> dict:
        return json.dumps(list)


Matches().getHTML(MATCHES_URL)
