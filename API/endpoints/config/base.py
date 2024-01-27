from abc import ABC, abstractmethod


class APIcaller(ABC):
    @abstractmethod
    def getHTML(self, uri: str) -> None:
        pass

    @abstractmethod
    def parseDoc(self, content: str) -> list:
        pass

    @abstractmethod
    def jsonConversion(self, content: list) -> dict:
        pass
