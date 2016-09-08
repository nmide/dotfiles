'use babel';
'use strict';

import fs from 'fs';
import configSchema from './config-schema';
import amuSettings from './amu-settings';

export default {
    config: configSchema,

    getContrast(color) {
        // Finds a contrasting text color
        var r = parseInt(color.substr(1, 2), 16),
            g = parseInt(color.substr(3, 2), 16),
            b = parseInt(color.substr(5, 2), 16),
            yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        if (yiq >= 220) {
            return `desaturate(darken(${color}, 40%), 25%)`;
        }
        if (yiq >= 190 && yiq < 220) {
            return `desaturate(darken(${color}, 35%), 20%)`;
        }
        if (yiq >= 130 && yiq < 190) {
            return `desaturate(darken(${color}, 25%), 20%)`;
        }
        if (yiq < 130) {
            return `lighten(${color}, 60%)`;
        }
    },

    toggleClass(boolean, className) {
        var root = document.documentElement;

        if (boolean) {
            root.classList.add(className);
        } else {
            root.classList.remove(className);
        }
    },

    writeConfig(options) {
        var accentColor = atom.config.get('atomic-ui.colors.accentColor').toHexString(),
            baseColor = atom.config.get('atomic-ui.colors.abaseColor').toHexString(),
            accentTextColor = this.getContrast(baseColor);

        var config = `@accent-color: ${accentColor};\n` +
                     `@accent-text-color: ${accentTextColor};\n` +
                     `@base-color: ${baseColor};\n`;

        fs.writeFile(`${__dirname}/../styles/custom.less`, config, 'utf8', () => {
            if (!options || !options.noReload) {
                var themePack = atom.packages.getLoadedPackage('atomic-ui');

                themePack.deactivate();
                setImmediate(() => themePack.activate());
            }
            if (options && options.callback && typeof options.callback === 'function') {
                options.callback();
            }
        });
    },

    activate() {
        amuSettings.apply();
        this.writeConfig({ noReload: true });
    },

    deactivate() {
    }
};
