# 8.1.0

* FEATURE: add `hours-suffix` and `minutes-suffix` attributes to `aif-moment-select` for display

# 8.0.3

* BUGFIX: allow to constantly update hours and minutes in `moment-select`. `$watchGroup` didn't seem to return correct values, altough it was triggered correctly.

# 8.0.2

* BUGFIX: make `disable` attribute passthrough single-choice-input into the radio and select inputs

# 8.0.1

* BUGFIX: in radio-input initialise the localModel as an object to not break the binding with the parent model

# 8.0.0

* Register each directive in a separate module to allow for importing only selected directives
* BREAKING CHANGE: Merge `templates.js` and `scripts.js` into `angular-input-fields.js` and `angular-input-fields.min.js`
* BREAKING CHANGE: directive templates namespaced to `aif`, each moved to a separate folder

# 7.0.1

* Update grouped-select-input html file to use aif-select-input directive.

# 7.0.0

* BREAKING CHANGE: Updating lodash to version 4.0.1

# 6.0.2

* BUGFIX: add a watch in radio-input to assign model value only when it's established
* BUGFIX: Add missing module dependencies for vr.slider and angular-bind-html-compile
* BUGFIX: Add style classes for grouped-select
* BUGFIX: Add angular-bootstrap bower dependency

# 6.0.1

* Fix distributed files to use correct aif prefix instead of aip

# 6.0.0

* BREAKING CHANGE: Add prefix of aif to input types

# 5.0.0

* BREAKING CHANGE: On the moment-select directive, remove the watch on the model as it might cause infinite loops.
* Also remove loops as it is a lot for just two values.
* Also update angular and angular-mocks to 1.4.

# 4.0.0

* BREAKING CHANGE: remove the 'min' and 'hr' strings from the moment-select template
* Add hours-len and minutes-len attributes to moment-select

# 3.0.0

* BREAKING CHANGE: duration-select renamed to moment-select
* moment-select returns a Moment object by default. Use `type="duration"`
attribute to return a Duration object.

# 2.0.0

* Add duration-select directive.
* BREAKING CHANGE: Add dependency on momentjs and lodash.

# 1.0.0

* Separate out reusable input types
