// @flow

import React, { useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSelector, createStructuredSelector } from "reselect";
import styled from "styled-components";

import type { Account, TokenAccount } from "@ledgerhq/live-common/lib/types";
import type { PortfolioRange } from "@ledgerhq/live-common/lib/types/portfolio";

import TrackPage from "~/renderer/analytics/TrackPage";
import Box from "~/renderer/components/Box";
import UpdateBanner from "~/renderer/components/Updater/Banner";
import { TopBannerContainer } from "~/renderer/screens/dashboard";
import { flattenSortAccountsEnforceHideEmptyTokenSelector } from "~/renderer/actions/general";
import { setAccountsViewMode, setSelectedTimeRange } from "~/renderer/actions/settings";
import { accountsSelector } from "~/renderer/reducers/accounts";
import { accountsViewModeSelector, selectedTimeRangeSelector } from "~/renderer/reducers/settings";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";

import AccountList from "./AccountList";
import AccountsHeader from "./AccountsHeader";
import EmptyState from "./EmptyState";
import MigrationBanner from "~/renderer/modals/MigrateAccounts/Banner";

type Props = {
  accounts: (Account | TokenAccount)[],
  range: PortfolioRange,
  mode: *,
  setAccountsViewMode: (*) => void,
  setSelectedTimeRange: PortfolioRange => void,
};

const accountsOrFlattenAccountsSelector = createSelector(
  accountsViewModeSelector,
  accountsSelector,
  flattenSortAccountsEnforceHideEmptyTokenSelector,
  (mode, accounts, flattenedAccounts) => (mode === "card" ? flattenedAccounts : accounts),
);

const mapStateToProps = createStructuredSelector({
  accounts: accountsOrFlattenAccountsSelector,
  mode: accountsViewModeSelector,
  range: selectedTimeRangeSelector,
});

const mapDispatchToProps = {
  setAccountsViewMode,
  setSelectedTimeRange,
};

export const GenericBox: ThemedComponent<{}> = styled(Box)`
  background: ${p => p.theme.colors.palette.background.paper};
  flex: 1;
  padding: 10px 20px;
  margin-bottom: 9px;
  color: #abadb6;
  font-weight: 600;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 #00000007;
`;

const AccountsPage = (props: Props) => {
  const history = useHistory();

  const onAccountClick = useCallback(
    (account: Account | TokenAccount, parentAccount: ?Account) =>
      parentAccount
        ? history.push(`/account/${parentAccount.id}/${account.id}`)
        : history.push(`/account/${account.id}`),
    [history],
  );

  const { accounts, mode, setAccountsViewMode, setSelectedTimeRange, range } = props;

  if (accounts.length === 0) {
    return (
      <>
        <TrackPage category="Accounts" accountsLength={accounts.length} />
        <TopBannerContainer>
          <UpdateBanner />
          <MigrationBanner />
        </TopBannerContainer>
        <EmptyState />
      </>
    );
  }

  return (
    <Box>
      <TrackPage category="Accounts" accountsLength={accounts.length} />
      <TopBannerContainer>
        <MigrationBanner />
      </TopBannerContainer>
      <AccountsHeader />
      <AccountList
        onAccountClick={onAccountClick}
        onRangeChange={setSelectedTimeRange}
        onModeChange={setAccountsViewMode}
        accounts={accounts}
        range={range}
        mode={mode}
      />
    </Box>
  );
};

const m: React$ComponentType<{}> = connect(mapStateToProps, mapDispatchToProps)(AccountsPage);

export default m;
