# In-memory storage. 
# Key = session_id (str)
# Value = List[dict] (The conversation history)

_sessions = {}

def get_history(session_id: str) -> list[dict]:
    """Retrieves the conversation history for a given session ID."""
    return _sessions.get(session_id, [])

def update_history(session_id: str, message: dict):
    """Appends a new message to the history."""
    if session_id not in _sessions:
        _sessions[session_id] = []
    
    _sessions[session_id].append(message)

def clear_history(session_id: str):
    """Deletes a session."""
    if session_id in _sessions:
        del _sessions[session_id]