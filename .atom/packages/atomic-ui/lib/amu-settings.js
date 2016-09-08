'use babel';
'use strict';

import amu from './main';
import tinycolor from 'tinycolor2';

var init = function () {
    if (!localStorage.getItem('atomic-ui:configUpdated')) {
        atom.config.set('atomic-ui');
        amu.writeConfig({
            callback() {
                atom.notifications.addSuccess('There were breaking changes and Atomic UI had to reset its settings.');
                localStorage.setItem('atomic-ui:configUpdated', true);
            }
        });
    }
};

// Check if there are custom icons packages
var checkPacks = function () {
    var root = document.documentElement;

    root.classList.remove('has-custom-icons');

    var loadedPackages =  atom.packages.getActivePackages(),
        iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];

    loadedPackages.forEach((pack) => {
        if (iconPacks.indexOf(pack.name) >= 0) {
            root.classList.add('has-custom-icons');
        }
    });
};

module.exports = {
    apply() {
        atom.packages.onDidActivatePackage(() => checkPacks());
        atom.packages.onDidDeactivatePackage(() => checkPacks());

        init();

        // Accent color

        atom.config.onDidChange('atomic-ui.colors.accentColor', (value) => {
            amu.writeConfig();
        });
        atom.config.onDidChange('atomic-ui.colors.abaseColor', (value) => {
            var baseColor = tinycolor(value.newValue.toRGBAString());
            if (baseColor.isValid() && atom.config.get('atomic-ui.colors.genAccent')) {
                let accentColor = baseColor.complement().saturate(20).lighten(5);

                if (accentColor.isValid()) {
                    atom.config.set('atomic-ui.colors.accentColor', accentColor.toRGBAString());
                }
            }
            amu.writeConfig();
        });
    }
};
