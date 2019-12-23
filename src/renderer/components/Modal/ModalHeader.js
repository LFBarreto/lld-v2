// @flow

import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Box from "~/renderer/components/Box";
import Text from "~/renderer/components/Text";
import Tabbable from "~/renderer/components/Box/Tabbable";

import IconCross from "~/renderer/icons/Cross";
import IconAngleLeft from "~/renderer/icons/AngleLeft";

const MODAL_HEADER_STYLE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 10,
  position: "relative",
  flexDirection: "row",
  minHeight: 66,
};

const ModalTitle = styled(Box).attrs(() => ({
  color: "palette.text.shade100",
  ff: "Inter|Medium",
  fontSize: 6,
}))`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 1;
  pointer-events: none;
`;

const ModalHeaderAction = styled(Tabbable).attrs(() => ({
  horizontal: true,
  align: "center",
  fontSize: 3,
  p: 3,
}))`
  border-radius: 8px;
  color: ${p => p.color || p.theme.colors.palette.text.shade60};
  top: 0;
  align-self: ${p => (p.right ? "flex-end" : "flex-start")};
  line-height: 0;
  ${p =>
    p.onClick
      ? `
    cursor: pointer;

    &:hover,
    &:hover ${Text} {
      color: ${p.theme.colors.palette.text.shade80};
    }

    &:active,
    &:active ${Text} {
      color: ${p.theme.colors.palette.text.shade100};
    }

    ${Text} {
      border-bottom: 1px dashed transparent;
    }
    &:focus span {
      border-bottom-color: none;
    }
  `
      : ""}
`;

const ModalHeader = ({
  children,
  onBack,
  onClose,
}: {
  children: any,
  onBack?: void => void,
  onClose?: void => void,
}) => {
  const { t } = useTranslation();
  return (
    <div style={MODAL_HEADER_STYLE}>
      {onBack ? (
        <ModalHeaderAction onClick={onBack}>
          <IconAngleLeft size={12} />
          <Text ff="Inter|Medium" fontSize={4} color="palette.text.shade40">
            {t("common.back")}
          </Text>
        </ModalHeaderAction>
      ) : (
        <ModalHeaderAction />
      )}
      <ModalTitle data-e2e="modalTitle">{children}</ModalTitle>
      {onClose ? (
        <ModalHeaderAction right color="palette.text.shade40" onClick={onClose}>
          <IconCross size={16} />
        </ModalHeaderAction>
      ) : (
        <ModalHeaderAction />
      )}
    </div>
  );
};

export default ModalHeader;
