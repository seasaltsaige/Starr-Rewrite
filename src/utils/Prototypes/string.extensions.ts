interface String {
    toProperCase(): string;
    toCamelCase(offset: 0 | 1): string;
    reverse(): string;
}

String.prototype.toProperCase = function (): string {
    let string = "";
    for (let i = 0; i < this.length; i++) {
        if (i === 0) string += this[0].toUpperCase();
        else string += this[i].toLowerCase();
    }
    return string;
}

/**
 * @param {number} offset - The location to start the camel case from
 */
String.prototype.toCamelCase = function (this: string, offset: 0 | 1): string {
    let string = "";
    for (let i = 0; i < this.length; i++) {
        if (offset === 0) {
            if ((i % 2) === 0) string += this[i].toUpperCase();
            else string += this[i].toLowerCase();
        } else {
            if ((i % 2) !== 0) string += this[i].toUpperCase();
            else string += this[i].toLowerCase();
        }
    }
    return string;
}

String.prototype.reverse = function (this: string): string {
    let reversed = [];
    for (let i = 0; i < this.length; i++) {
        reversed.unshift(this[i]);
    }
    return reversed.join("");
}