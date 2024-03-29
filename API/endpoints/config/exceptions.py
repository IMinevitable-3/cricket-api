class HTMLException(Exception):
    """Handles HTML exceptions."""

    def __init__(self, message=""):
        self.message = message
        super().__init__(self.message)
