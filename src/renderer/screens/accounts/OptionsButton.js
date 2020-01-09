// @flow

import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Track from "~/renderer/analytics/Track";
import Box from "~/renderer/components/Box";
import Button from "~/renderer/components/Button";
import DropDown, { DropDownItem } from "~/renderer/components/DropDown";
import Switch from "~/renderer/components/Switch";
import Tooltip from "~/renderer/components/Tooltip";
import IconDots from "~/renderer/icons/Dots";
import IconDownloadCloud from "~/renderer/icons/DownloadCloud";
import IconSend from "~/renderer/icons/Send";
import { hideEmptyTokenAccountsSelector } from "~/renderer/reducers/settings";
import { openModal } from "~/renderer/actions/modals";
import { setHideEmptyTokenAccounts } from "~/renderer/actions/settings";

import type { DropDownItemType } from "~/renderer/components/DropDown";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";

const Separator: ThemedComponent<{}> = styled.div`
  background-color: ${p => p.theme.colors.palette.divider};
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Item: ThemedComponent<{
  disableHover?: boolean,
  isHighlighted?: boolean,
}> = styled(DropDownItem)`
  width: 230px;
  cursor: pointer;
  white-space: pre-wrap;
  justify-content: flex-start;
  align-items: center;
  background-color: ${p =>
    !p.disableHover && p.isHighlighted && p.theme.colors.palette.background.default};
`;

type ItemType = DropDownItemType & {
  icon?: React$Element<*>,
  onClick?: Function,
  type?: "separator",
};

const OptionsButton = () => {
  const dispatch = useDispatch();
  const hideEmptyTokenAccounts = useSelector(hideEmptyTokenAccountsSelector);
  const { t } = useTranslation();

  const items: DropDownItemType[] = [
    {
      key: "exportOperations",
      label: t("accounts.optionsMenu.exportOperations"),
      icon: <IconDownloadCloud size={16} />,
      onClick: () => dispatch(openModal("MODAL_EXPORT_OPERATIONS")),
    },
    {
      key: "exportAccounts",
      label: t("accounts.optionsMenu.exportToMobile"),
      icon: <IconSend size={16} />,
      onClick: () => dispatch(openModal("MODAL_EXPORT_ACCOUNTS")),
    },
    {
      key: "sep1",
      type: "separator",
      label: "",
    },
    {
      key: "hideEmpty",
      label: t("settings.accounts.hideEmptyTokens.title"),
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        dispatch(setHideEmptyTokenAccounts(!hideEmptyTokenAccounts));
      },
    },
  ];

  const renderItem = ({ item, isHighlighted }: { item: ItemType, isHighlighted: boolean }) => {
    if (item.type === "separator") {
      return <Separator />;
    }

    return (
      <Item
        horizontal
        isHighlighted={isHighlighted}
        flow={2}
        onClick={item.onClick}
        disableHover={item.key === "hideEmpty"}
      >
        {item.key === "hideEmpty" ? (
          <Box mr={4}>
            <Track
              onUpdate
              event={
                hideEmptyTokenAccounts
                  ? "hideEmptyTokenAccountsEnabled"
                  : "hideEmptyTokenAccountsDisabled"
              }
            />
            <Switch
              isChecked={hideEmptyTokenAccounts}
              onChange={newState => dispatch(setHideEmptyTokenAccounts(newState))}
            />
          </Box>
        ) : item.icon ? (
          <Box mr={4}>{item.icon}</Box>
        ) : null}
        {item.label}
      </Item>
    );
  };

  return (
    <DropDown border horizontal offsetTop={2} items={items} renderItem={renderItem}>
      <Tooltip content={t("accounts.optionsMenu.title")}>
        <Button
          small
          outlineGrey
          flow={1}
          style={{ width: 34, padding: 0, justifyContent: "center" }}
        >
          <Box alignItems="center">
            <IconDots size={14} />
          </Box>
        </Button>
      </Tooltip>
    </DropDown>
  );
};

export default OptionsButton;
