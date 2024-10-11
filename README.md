# Graph Theory (Disclaimer: this project is a WIP)

**Graph Theory** is a plugin for Obsidian that automatically identifies and connects notes with similar content or themes by leveraging a large language model (LLM). This plugin helps you discover relationships between your notes based on language patterns, making it easier to explore your ideas and create a more connected knowledge base.

## Features

- **Automated Linking:** Automatically link notes with similar language patterns using AI.
- **Customizable Matching Thresholds:** Set thresholds for similarity to control which notes get linked.
- **Visualization:** View connections between notes with an interactive graph.
- **Manual Override:** Approve or reject suggested connections.
- **Privacy Focused:** All language processing occurs locally or in a secure environment to ensure privacy.

## Installation

1. Download the latest release from the [GitHub Releases page](https://github.com/ashsnandi/graphtheory-md).
2. Extract the folder and place it in your Obsidian plugins directory (`.obsidian/plugins`).
3. Open Obsidian, go to **Settings > Community Plugins**, and enable **Graph Theory**.

## Usage

1. Once enabled, go to any note and use the **Connect Notes** command to analyze and find related notes.
2. Adjust similarity thresholds in the **Settings** menu under **Obsidian LLM-Note Connector** to fine-tune link suggestions.
3. View connected notes in the **Connections** tab or use the **Graph View** for a visual representation.

## Settings

- **Similarity Threshold:** Adjust this setting to control how closely notes need to match before they are connected.
- **Connection Limit:** Set a limit on the number of connections each note can have to avoid clutter.
- **Manual Approval:** Toggle this option to review suggested connections before they are added.

## Contributing

1. Fork the repository and clone it locally.
2. Install dependencies with `npm install`.
3. Submit a pull request with any improvements or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

Special thanks to the Obsidian community and all contributors who helped make this plugin possible.

---

For any questions or feature requests, please open an issue on [GitHub](https://github.com/your-username/obsidian-llm-note-connector/issues).

