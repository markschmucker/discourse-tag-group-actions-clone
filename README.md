# discourse Tag Group Actions
This plugin adds features to your Discourse.

- adds a new `search-advanced-option` to display topics not in particular tag-group which will be visible only to staff.

- adds a new `topic-bulk-action` which can be used to `close-deal` to make this working you need to configure 2 site-settings
  - Enter tag-group-name in `tga_bulk_action_tag_group_name` to perform bulk actions on tags of specified tag-group
  - Enter tag-name in `tga_bulk_action_replace_tag_name` to replace tag from selected topics. i.e. entered tag should be available in your site.


## Setup
- All site settings of this plugin have a prefix 'tga_'

- Not sure how to install a plugin?<a href="https://meta.discourse.org/t/install-plugins-in-discourse/19157"> Follow the steps here</a>

## Site Settings
- `tga_bulk_action_tag_group_name` will perform bulk on tags of specified tag-group-name (case sensitive)
- `tga_bulk_action_replace_tag_name` will be used in bulk-action to replace tag from `tga_bulk_action_tag_group_name` (case-sensitive)

## Maintainers and Developers
@Ahmed_Gagan

**Note: Test the plugin before adding it to a live website**
