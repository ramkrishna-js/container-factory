import {
    ContainerBuilder,
    SectionBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    FileBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    StringSelectMenuBuilder,
    UserSelectMenuBuilder,
    RoleSelectMenuBuilder,
    ChannelSelectMenuBuilder,
    MentionableSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonStyle,
    MessageFlags
} from 'discord.js';

/**
 * CONTAINER FACTORY
 * A robust utility for building Discord Components v2.
 */

/**
 * Create a text display component
 * @param {string} content - The text content
 * @returns {TextDisplayBuilder}
 */
export function createText(content) {
    return new TextDisplayBuilder().setContent(content);
}

/**
 * Create a separator
 * @param {boolean} spacing - Whether to add spacing (default: true)
 * @returns {SeparatorBuilder}
 */
export function createSeparator(spacing = true) {
    const separator = new SeparatorBuilder();
    if (spacing) separator.setSpacing(1);
    return separator;
}

/**
 * Create a section with text and optional accessory
 * @param {string} textContent - Main text for the section
 * @param {ButtonBuilder|ThumbnailBuilder} accessory - Optional accessory (Button or Thumbnail)
 * @returns {SectionBuilder}
 */
export function createSection(textContent, accessory = null) {
    const section = new SectionBuilder()
        .addTextDisplayComponents(createText(textContent));

    if (accessory) {
        section.setButtonAccessory(accessory); // User might pass a button
    }

    return section;
}

/**
 * Create a media gallery with single or multiple items
 * @param {string|string[]} imageUrls - URL or array of URLs
 * @param {string} description - Optional description for the first item (if single)
 * @returns {MediaGalleryBuilder}
 */
export function createMediaGallery(imageUrls, description = null) {
    const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
    const items = urls.map((url, index) => {
        const item = new MediaGalleryItemBuilder().setURL(url);
        // Only apply description to the first item if provided and it's a single URL call implication, 
        // or logic could be improved. For now keeping it simple as per original.
        if (index === 0 && description) item.setDescription(description);
        return item;
    });

    return new MediaGalleryBuilder().addItems(items);
}

/**
 * Create a file component
 * @param {string} url - File URL
 * @param {string} description - Optional description
 * @param {boolean} spoiler - Whether to mark as spoiler
 * @returns {FileBuilder}
 */
export function createFile(url, description = null, spoiler = false) {
    const file = new FileBuilder().setFile(url);
    if (description) file.setDescription(description);
    if (spoiler) file.setSpoiler(true);
    return file;
}

/**
 * Create a button with emoji only
 * @param {string} customId
 * @param {string} emoji
 * @param {ButtonStyle} style
 * @param {boolean} disabled
 * @returns {ButtonBuilder}
 */
export function createButton(customId, emoji, style = ButtonStyle.Secondary, disabled = false) {
    return new ButtonBuilder()
        .setCustomId(customId)
        .setEmoji(emoji)
        .setStyle(style)
        .setDisabled(disabled);
}

/**
 * Create a button with label (and optional emoji)
 * @param {string} customId
 * @param {string} label
 * @param {ButtonStyle} style
 * @param {string} emoji
 * @param {boolean} disabled
 * @returns {ButtonBuilder}
 */
export function createLabelButton(customId, label, style = ButtonStyle.Secondary, emoji = null, disabled = false) {
    const button = new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(style)
        .setDisabled(disabled);

    if (emoji) {
        button.setEmoji(emoji);
    }

    return button;
}

/**
 * Create a link button
 * @param {string} label
 * @param {string} url
 * @param {string} emoji
 * @returns {ButtonBuilder}
 */
export function createLinkButton(label, url, emoji = null) {
    const button = new ButtonBuilder()
        .setLabel(label)
        .setURL(url)
        .setStyle(ButtonStyle.Link);

    if (emoji) {
        button.setEmoji(emoji);
    }

    return button;
}

/**
 * Helper to create standard options for select menus
 * @param {Array<{label: string, value: string, description?: string, emoji?: string, default?: boolean}>} options
 * @returns {StringSelectMenuOptionBuilder[]}
 */
function buildOptions(options) {
    return options.map(opt => {
        const option = new StringSelectMenuOptionBuilder()
            .setLabel(opt.label)
            .setValue(opt.value);

        if (opt.description) option.setDescription(opt.description);
        if (opt.emoji) option.setEmoji(opt.emoji);
        if (opt.default) option.setDefault(opt.default);

        return option;
    });
}

/**
 * Create a string select menu
 * @param {string} customId
 * @param {string} placeholder
 * @param {Array} options
 * @param {number} minValues
 * @param {number} maxValues
 * @param {boolean} disabled
 * @returns {StringSelectMenuBuilder}
 */
export function createStringSelectMenu(customId, placeholder, options, minValues = 1, maxValues = 1, disabled = false) {
    return new StringSelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .addOptions(buildOptions(options))
        .setMinValues(minValues)
        .setMaxValues(maxValues)
        .setDisabled(disabled);
}

/**
 * Create a user select menu
 * @param {string} customId
 * @param {string} placeholder
 * @param {number} minValues
 * @param {number} maxValues
 * @param {boolean} disabled
 * @returns {UserSelectMenuBuilder}
 */
export function createUserSelectMenu(customId, placeholder, minValues = 1, maxValues = 1, disabled = false) {
    return new UserSelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .setMinValues(minValues)
        .setMaxValues(maxValues)
        .setDisabled(disabled);
}

/**
 * Create a role select menu
 * @param {string} customId
 * @param {string} placeholder
 * @param {number} minValues
 * @param {number} maxValues
 * @param {boolean} disabled
 * @returns {RoleSelectMenuBuilder}
 */
export function createRoleSelectMenu(customId, placeholder, minValues = 1, maxValues = 1, disabled = false) {
    return new RoleSelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .setMinValues(minValues)
        .setMaxValues(maxValues)
        .setDisabled(disabled);
}

/**
 * Create a channel select menu
 * @param {string} customId
 * @param {string} placeholder
 * @param {number[]} channelTypes
 * @param {number} minValues
 * @param {number} maxValues
 * @param {boolean} disabled
 * @returns {ChannelSelectMenuBuilder}
 */
export function createChannelSelectMenu(customId, placeholder, channelTypes = [], minValues = 1, maxValues = 1, disabled = false) {
    const menu = new ChannelSelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .setMinValues(minValues)
        .setMaxValues(maxValues)
        .setDisabled(disabled);
    
    if (channelTypes.length > 0) {
        menu.setChannelTypes(channelTypes);
    }
    return menu;
}

/**
 * Create a mentionable select menu
 * @param {string} customId
 * @param {string} placeholder
 * @param {number} minValues
 * @param {number} maxValues
 * @param {boolean} disabled
 * @returns {MentionableSelectMenuBuilder}
 */
export function createMentionableSelectMenu(customId, placeholder, minValues = 1, maxValues = 1, disabled = false) {
    return new MentionableSelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .setMinValues(minValues)
        .setMaxValues(maxValues)
        .setDisabled(disabled);
}

/**
 * Create an action row with components
 * @param {...any} components
 * @returns {ActionRowBuilder}
 */
export function createActionRow(...components) {
    return new ActionRowBuilder().addComponents(...components);
}

/**
 * Build a complete container with components
 * @param {...any} components
 * @returns {ContainerBuilder}
 */
export function buildContainer(...components) {
    const container = new ContainerBuilder();

    for (const component of components) {
        if (component instanceof TextDisplayBuilder) {
            container.addTextDisplayComponents(component);
        } else if (component instanceof SectionBuilder) {
            container.addSectionComponents(component);
        } else if (component instanceof SeparatorBuilder) {
            container.addSeparatorComponents(component);
        } else if (component instanceof MediaGalleryBuilder) {
            container.addMediaGalleryComponents(component);
        } else if (component instanceof ActionRowBuilder) {
            container.addActionRowComponents(component);
        } else if (component instanceof FileBuilder) {
            container.addFileComponents(component);
        }
    }

    return container;
}

/**
 * Create message payload with Components v2 flag
 * @param {ContainerBuilder} container
 * @param {Array} files
 * @returns {Object}
 */
export function createMessagePayload(container, files = []) {
    return {
        components: [container],
        files,
        flags: MessageFlags.IsComponentsV2
    };
}
