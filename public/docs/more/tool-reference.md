---
title: Tool Reference
description: Reference for the main built-in tools the Twent agent can call.
sidebar:
  label: Tool Reference
  order: 5
---

Reference for the main built-in tools the Twent agent can call. The full set is larger (60+ tools) — this covers the ones you'll see most.

## Files

| Tool | What it does | Key params |
| --- | --- | --- |
| read_file | Read a file (auto-OCR on images; can return image/audio/video directly) | `path`, `environment` (android / linux / repo:\<name\>) |
| read_file_part | Read a line range | `path`, `start_line`, `end_line` |
| write_file | Write content to a file | `path`, `content` |
| apply_file | Find-and-replace edits | `path`, `old`, `new` |
| delete_file, copy_file, move_file, make_directory, list_files, find_files, file_exists, file_info | Standard file operations | `path`, … |

## Shell

| Tool | What it does | Key params |
| --- | --- | --- |
| execute_shell | Run a command in the Ubuntu environment | `command`, `timeout_ms`, `environment` |
| create_terminal_session / execute_in_terminal_session / close_terminal_session | Persistent interactive terminal sessions | `session_id`, `command` |

## UI automation

| Tool | What it does | Key params |
| --- | --- | --- |
| tap / double_tap / long_press | Tap at coordinates | `x`, `y` |
| click_element | Tap an element from the accessibility tree | element reference |
| swipe (+ swipe_up/down/left/right) | Swipe gestures | `start_x`, `start_y`, `end_x`, `end_y` |
| scroll_down / scroll_up / … | Scroll by pixels | `pixels` |
| type_text | Type text | `text` |
| press_key | Press a key | `key` |
| open_app / start_app / stop_app | Launch or close apps | `package_name` or `app_name` |
| get_page_info, get_current_activity | Read what's on screen | — |

## Web & network

| Tool | What it does | Key params |
| --- | --- | --- |
| mcp_tool | Call any MCP server's tools — including ddg-search (`tool="search"` / `"fetch_content"`) for web search and page fetching | `server`, `tool`, `params` |
| http_request | Raw HTTP request | `url`, `method`, `headers` |
| download_file | Download a URL to storage | `url`, `destination` |

## Memory

| Tool | What it does | Key params |
| --- | --- | --- |
| tw_recall | Search memories | `query`, `limit` |
| tw_remember | Save a memory | `title`, `content`, optional `category`, `importance`, `tags`, `entities` |
| tw_forget | Delete a memory | `title` or `id` |
| tw_learn_user / tw_forget_user | Manage the user profile memory | `fact` |

## Agents, bots & skills

| Tool | What it does | Key params |
| --- | --- | --- |
| delegate_subagent | Spawn a subagent for a subtask | task config |
| create_bot / update_bot / delete_bot / get_bot / list_bots | Manage [bots](/features/bots) | bot config |
| trigger_bot | Fire any bot manually | `id` |
| browse_skills / install_skill / load_skill / use_skill / list_skills | Discover and use [skills](/plugins/skills) | `skill_name`, `repo_url` |
| browse_mcps / install_mcp / run_mcp / mcp_tool | Discover and use [MCP servers](/plugins/mcp) | `server`, `config_json` |

## Media & device

ffmpeg_convert / ffmpeg_execute / ffmpeg_info (media processing), speech_to_text / text_to_speech (voice), get_battery_status / device_info / get_notifications (device state), zip_files / unzip_files (archives), execute_intent / send_broadcast (Android intents), clarify (ask you before deciding).
