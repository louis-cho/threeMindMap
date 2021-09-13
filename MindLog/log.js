var log_mode = 3;

/**
 * type : 0 -> error
 * type : 1 -> warning
 * type : 2 -> etc
 */
export function log(type, message) {
    if (type >= log_mode)
        return;

    console.log(message);
}

export function rayLogSetMode(mode) {
    log_mode = mode;
}