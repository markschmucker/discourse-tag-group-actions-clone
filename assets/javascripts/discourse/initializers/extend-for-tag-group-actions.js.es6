import { withPluginApi } from "discourse/lib/plugin-api";
import SearchAdvancedOptions from "discourse/components/search-advanced-options";
import { addBulkButton } from "discourse/controllers/topic-bulk-actions";
import TopicButtonAction from "discourse/controllers/topic-bulk-actions";

function initialize(api) {
  api.modifyClass("component:tag-group-chooser", {
    actions: {
      onChange(value) {
        this._super(...arguments);
        if (this.onChangeSearchedTermField) {
          this.onChangeSearchedTermField(
            "notInTagGroup",
            "_updateSearchTermForTagGroup",
            value
          );
        }
      },
    },
  });
}

const REGEXP_TAG_GROUP_PREFIX = /^(notInTagGroup:)/gi;

export default {
  name: "extend-for-tag-group-actions",
  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (!siteSettings.tag_group_action_enabled) {
      return;
    }
    const currentUser = container.lookup("current-user:main");

    if (currentUser && currentUser.staff) {
      SearchAdvancedOptions.reopen({
        init() {
          this._super();

          this.set("searchedTerms.notInTagGroup", null);
        },

        _updateSearchTermForTagGroup() {
          const match = this.filterBlocks(REGEXP_TAG_GROUP_PREFIX);
          let userFilter = this.get("searchedTerms.notInTagGroup");
          let searchTerm = this.searchTerm || "";
          let keyword = "notInTagGroup";
          if (userFilter && userFilter.length !== 0) {
            userFilter = userFilter[0].replaceAll(" ", "_");
            if (match.length !== 0) {
              searchTerm = searchTerm.replace(
                match[0],
                `${keyword}:${userFilter}`
              );
            } else {
              searchTerm += ` ${keyword}:${userFilter}`;
            }
            this._updateSearchTerm(searchTerm);
          } else if (match.length !== 0) {
            searchTerm = searchTerm.replace(match[0], "");
            this._updateSearchTerm(searchTerm);
          }
        },

        didReceiveAttrs() {
          this._super(...arguments);
          this.setSearchedTermValue(
            "searchedTerms.notInTagGroup",
            REGEXP_TAG_GROUP_PREFIX
          );
        },
      });
    }

    if (
      currentUser &&
      siteSettings.tga_bulk_action_tag_group_name &&
      siteSettings.tga_bulk_action_replace_tag_name
    ) {
      TopicButtonAction.reopen({
        actions: {
          closeDeal() {
            this.performAndRefresh({ type: "closeDeal" });
          },
        },
      });

      addBulkButton("closeDeal", "close_deal", {
        icon: "user-plus",
        class: "btn-default",
      });
    }

    withPluginApi("0.11.0", (api) => initialize(api, container));
  },
};
