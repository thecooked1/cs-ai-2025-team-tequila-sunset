"""
Pydantic Models for the ATLAS Project
Week 5 | Building AI-Powered Applications

This file defines the core data structures for the ATLAS application,
ensuring type safety, validation, and clear schemas for API communication
and function call results.
"""

from pydantic import BaseModel, Field
from typing import List, Literal, Optional, Dict, Any
from datetime import datetime


# ========================================
# 1. CORE CONVERSATIONAL MODELS
# ========================================

class ChatMessage(BaseModel):
    """A single message in the conversation history."""
    role: Literal["user", "assistant"] = Field(description="The role of the message sender.")
    content: str = Field(description="The text content of the message.")
    image_url: Optional[str] = Field(default=None, description="An optional URL for a generated image.")

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "role": "user",
                    "content": "I need a grumpy dwarf blacksmith.",
                },
                {
                    "role": "assistant",
                    "content": "Excellent idea! Here is Kaelen Firehand...",
                },
                {
                    "role": "assistant",
                    "content": "Here is what he looks like:",
                    "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/private/..."
                }
            ]
        }


class ChatRequest(BaseModel):
    """The request body sent from the frontend to the /api/chat endpoint."""
    messages: List[ChatMessage] = Field(
        description="The entire conversation history for the current session."
    )


# ========================================
# 2. CREATIVE CONTENT MODELS (FUNCTION RESULTS)
# ========================================

class GeneratedNPC(BaseModel):
    """Structured data for a generated Non-Player Character."""
    name: str = Field(min_length=2, description="The unique name of the character.")
    race: str = Field(description="The character's fantasy race (e.g., Dwarf, Elf, Human).")
    description: str = Field(min_length=50, description="A detailed physical and atmospheric description.")
    personality: str = Field(min_length=20, description="Key personality traits and quirks.")
    secret: str = Field(min_length=20, description="A hidden secret or motivation for the character.")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Kaelen Firehand",
                "race": "Dwarf",
                "description": "Kaelen is a stout dwarf with a soot-stained beard braided with copper wires. His eyes are sharp and critical...",
                "personality": "Gruff and short-tempered on the surface, but possesses a deep sense of honor and pride in his work.",
                "secret": "He secretly crafts beautiful, delicate silver jewelry at night, a stark contrast to his rugged daily work."
            }
        }


class GeneratedImage(BaseModel):
    """Structured data for a generated image."""
    image_url: str = Field(description="The temporary URL for the generated DALL-E 3 image.")
    prompt_used: str = Field(description="The detailed prompt that was sent to the image generation model.")

    class Config:
        json_schema_extra = {
            "example": {
                "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/private/...",
                "prompt_used": "Digital painting portrait of a grumpy male dwarf blacksmith named Kaelen. He has a long, braided red beard..."
            }
        }


# ========================================
# 3. TOOL & FUNCTION CALL MODELS
# ========================================

class ToolResult(BaseModel):
    """
    A standardized wrapper for the result of an internal function call (a "tool").
    This is what our Python functions will return internally.
    """
    status: Literal["success", "error"] = Field(description="The execution status of the tool.")
    data: Optional[Dict[str, Any]] = Field(default=None,
                                           description="The successful result data (e.g., a GeneratedNPC model).")
    error_code: Optional[str] = Field(default=None, description="A machine-readable error code if the tool failed.")
    error_message: Optional[str] = Field(default=None, description="A human-readable error message if the tool failed.")

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "status": "success",
                    "data": {
                        "name": "Kaelen Firehand",
                        "race": "Dwarf",
                        "description": "...",
                        "personality": "...",
                        "secret": "..."
                    }
                },
                {
                    "status": "error",
                    "error_code": "GENERATION_FAILED",
                    "error_message": "The AI was unable to generate a character."
                }
            ]
        }


# ========================================
# 4. STANDARDIZED ERROR RESPONSE MODEL
# ========================================

class APIErrorResponse(BaseModel):
    """
    Standardized error response sent back to the client on API failure.
    """
    error_code: str = Field(description="A machine-readable error code (e.g., 'INTERNAL_SERVER_ERROR').")
    error_message: str = Field(description="A user-friendly error message.")
    timestamp: datetime = Field(default_factory=datetime.now, description="The timestamp of when the error occurred.")

    class Config:
        json_schema_extra = {
            "example": {
                "error_code": "OPENAI_API_UNAVAILABLE",
                "error_message": "The AI service is currently experiencing issues. Please try again in a few moments.",
                "timestamp": "2025-10-31T15:30:00Z"
            }
        }


# ========================================
# USAGE EXAMPLES
# ========================================

if __name__ == "__main__":
    print("=" * 60)
    print("ATLAS - PYDANTIC MODELS USAGE EXAMPLES")
    print("=" * 60)

    # 1. Simulating a request from the frontend
    print("\n1. Simulating a Frontend Chat Request:")
    chat_request_data = {
        "messages": [
            {"role": "user", "content": "I need a grumpy dwarven blacksmith."},
            {"role": "assistant", "content": "An excellent choice. How about the name Kaelen Firehand?"},
            {"role": "user", "content": "I love it! Tell me more about him."}
        ]
    }
    chat_request = ChatRequest(**chat_request_data)
    print(chat_request.model_dump_json(indent=2))
    print(f"✅ Chat request is valid and contains {len(chat_request.messages)} messages.")

    # 2. Simulating a successful NPC generation from our internal tool
    print("\n2. Simulating a successful `create_npc` tool result:")
    npc_data = {
        "name": "Kaelen Firehand",
        "race": "Dwarf",
        "description": "Kaelen is a stout dwarf with a soot-stained beard...",
        "personality": "Gruff and short-tempered...",
        "secret": "He secretly crafts beautiful jewelry..."
    }
    generated_npc = GeneratedNPC(**npc_data)
    tool_result_success = ToolResult(status="success", data=generated_npc.model_dump())
    print(tool_result_success.model_dump_json(indent=2))
    print("✅ Tool result for successful NPC generation is valid.")

    # 3. Simulating a failed tool call
    print("\n3. Simulating a failed `generate_image` tool result:")
    tool_result_failure = ToolResult(
        status="error",
        error_code="IMAGE_GENERATION_FAILED",
        error_message="The DALL-E 3 API returned a 503 error."
    )
    print(tool_result_failure.model_dump_json(indent=2))
    print("✅ Tool result for a failure is valid.")

    # 4. Demonstrating validation
    print("\n4. Validation Error Example:")
    try:
        invalid_npc = GeneratedNPC(
            name="X",  # Too short
            race="Dwarf",
            description="Short.",  # Too short
            personality="Nice.",  # Too short
            secret="None."  # Too short
        )
    except Exception as e:
        print(f"❌ Validation failed as expected for GeneratedNPC.")
        # print(f"   {e}")

    print("\n" + "=" * 60)
    print("✅ All examples completed successfully!")
    print("=" * 60)