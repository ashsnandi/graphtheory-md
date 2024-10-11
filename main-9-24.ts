import { App, Plugin, PluginSettingTab, Setting, Notice } from 'obsidian';

// interface for plugin settings -- we'll store these
interface LLMNoteConnectorSettings {
    similarityThreshold: number; // how similar notes need to be to connect em
    connectionLimit: number; // max connections per note, avoid clutter
    manualApproval: boolean; // if true, user gets to approve connections
}

// default settings, just in case user doesn't tweak anything
const DEFAULT_SETTINGS: LLMNoteConnectorSettings = {
    similarityThreshold: 0.7, // moderate similarity threshold
    connectionLimit: 5, // only 5 connections, keep it manageable
    manualApproval: true, // yep, let’s approve connections by hand
};

// main plugin class, inherits from Plugin 
export default class LLMNoteConnectorPlugin extends Plugin {
    settings: LLMNoteConnectorSettings; // we’ll put settings here

    async onload() {
        console.log('loading llm note connector...'); // little loading message

        await this.loadSettings(); // fetch saved settings

        // add command to Obsidian - shows up in the command palette
        this.addCommand({
            id: 'connect-notes', // command id - unique
            name: 'Connect Notes Based on Similarity', // how it'll show up in the palette
            callback: () => this.connectNotes(), // what happens when you run the command
        });

        // add settings tab to the app
        this.addSettingTab(new LLMNoteConnectorSettingTab(this.app, this));
    }

    // this method is all about connecting notes 
    async connectNotes() {
        const notes = this.app.vault.getMarkdownFiles(); // grab all the markdown files (aka notes)
        const connections = []; // array to store the connections we find

        // loop over each note, find connections
        for (const note of notes) {
            const content = await this.app.vault.read(note); // get note content as text
            const similarNotes = await this.findSimilarNotes(content, notes); // go find notes with similar content

            // put the connections into our list
            connections.push({
                note,
                similarNotes,
            });
        }

        // notify user - just a placeholder for now
        new Notice('notes connected based on similarity.');
    }

    // mock function for finding similar notes - replace this with real LLM call
    async findSimilarNotes(content: string, notes: any[]) {
        // filter down to notes that pass similarity threshold
        return notes.filter((note) => {
            // randomly decide if note is similar for now
            return Math.random() < this.settings.similarityThreshold;
        }).slice(0, this.settings.connectionLimit); // only keep up to the limit
    }

    onunload() {
        console.log('unloading llm note connector...'); // goodbye message when we unload
    }

    // loads settings from disk - async cause it’s an I/O operation
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    // save settings back to disk
    async saveSettings() {
        await this.saveData(this.settings);
    }
}

// class for the settings tab - let's user change plugin settings
class LLMNoteConnectorSettingTab extends PluginSettingTab {
    plugin: LLMNoteConnectorPlugin;

    constructor(app: App, plugin: LLMNoteConnectorPlugin) {
        super(app, plugin); // call the parent constructor
        this.plugin = plugin; // store plugin reference
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty(); // clear everything before we add settings

        // title at the top of the settings tab
        containerEl.createEl('h2', { text: 'LLM Note Connector Settings' });

        // slider for similarity threshold - lets user set it
        new Setting(containerEl)
            .setName('Similarity Threshold')
            .setDesc('Set how similar notes need to be to connect.')
            .addSlider(slider => slider
                .setValue(this.plugin.settings.similarityThreshold)
                .setLimits(0.1, 1, 0.1) // min, max, step
                .onChange(async (value) => {
                    this.plugin.settings.similarityThreshold = value; // update setting
                    await this.plugin.saveSettings(); // save to disk
                }));

        // slider for connection limit - number of connections per note
        new Setting(container
