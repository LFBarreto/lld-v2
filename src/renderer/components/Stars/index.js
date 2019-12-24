// @flow
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trans } from "react-i18next";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import { getAccountCurrency } from "@ledgerhq/live-common/lib/account";

import { starredAccountsEnforceHideEmptyTokenSelector } from "~/renderer/reducers/accounts";
import { dragDropStarAction } from "~/renderer/actions/settings";

import Hide from "~/renderer/components/MainSideBar/Hide";
import Text from "~/renderer/components/Text";
// TODO: rework Image component
// import Image from '~/renderer/components/Image'
import Tooltip from "~/renderer/components/Tooltip";

import Item from "./Item";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  text-align: center;
  padding: 0px 8px;
  & > :first-child {
    margin-bottom: 14px;
  }
`;

type Props = {
  pathname: string,
  collapsed: boolean,
};

const Stars = ({ pathname, collapsed }: Props) => {
  const starredAccounts = useSelector(starredAccountsEnforceHideEmptyTokenSelector);
  const dispatch = useDispatch();

  const onDragEnd = useCallback(
    ({ source, destination }) => {
      if (destination) {
        const from = source.index;
        const to = destination.index;

        dispatch(
          dragDropStarAction({ from: starredAccounts[from].id, to: starredAccounts[to].id }),
        );
      }
    },
    [dispatch, starredAccounts],
  );

  return starredAccounts && starredAccounts.length ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" direction="vertical">
        {(provided, snapshot) => (
          <Container key={pathname} ref={provided.innerRef}>
            {starredAccounts.map((account, i) => (
              <Tooltip
                content={
                  account.type === "Account" ? account.name : getAccountCurrency(account).name
                }
                delay={collapsed ? 0 : 1200}
                key={account.id}
                placement={collapsed ? "right" : "top"}
                boundary={collapsed ? "window" : undefined}
                enabled={!snapshot.isDraggingOver}
              >
                <Item
                  index={i}
                  key={account.id}
                  account={account}
                  pathname={pathname}
                  collapsed={collapsed}
                />
              </Tooltip>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <Hide visible={!collapsed}>
      <Placeholder>
        {/* <Image
          alt="stars placeholder"
          resource="empty-bookmarks.png"
          width="95"
          height="53"
          themeTyped
        /> */}
        <Text
          ff="Inter|SemiBold"
          color="palette.text.shade60"
          fontSize={3}
          style={{ minWidth: 180 }}
        >
          <Trans i18nKey={"stars.placeholder"}>
            {"Accounts that you star on the"}
            <Text ff="Inter|SemiBold" color="palette.text.shade100">
              {"Accounts"}
            </Text>
            {" page will now appear here!."}
          </Trans>
        </Text>
      </Placeholder>
    </Hide>
  );
};

export default Stars;