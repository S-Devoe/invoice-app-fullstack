import styled, { css } from "styled-components";

interface Props {
  className?: string;
  status: string | undefined;
}

const InvoiceStatusBadge: React.FC<Props> = ({ className, status }) => {
  const getStatus = (): string => {
    switch (status) {
      case "draft":
        return "Draft";
      case "pending":
        return "Pending";
      case "paid":
        return "Paid";
      default:
        return "";
    }
  };
  return (
    <Status className={className} status={status}>
      <BulletPoint status={status} />
      {getStatus()}
    </Status>
  );
};
export default InvoiceStatusBadge;

interface BulletPointProp {
  status: string | undefined;
}
const Status = styled.div<BulletPointProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 8rem;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 1rem;
  border-radius: 6px;
  text-align: center;

  ${({ status }) =>
    status === "paid" &&
    css`
      color: "#33d69f";
      background: "#33d69f0f";
    `}

  ${({ status }) =>
    status === "pending" &&
    css`
      color: #ff8f00;
      background: #ff8f000f;
    `}

    ${({ status, theme }) =>
    status === "draft" &&
    css`
      color: ${({ theme }) => theme.color.badge.draft};
      background: ${({ theme }) => theme.color.badge.draftBg};
    `}
`;

const BulletPoint = styled.span<BulletPointProp>`
  height: 0.65rem;
  width: 0.65rem;
  border-radius: 50%;
  margin-right: 0.8rem;
  background: ${({ status, theme }) =>
    status === "paid"
      ? "#33d69f"
      : status === "pending"
      ? "#FF8F00"
      : theme.color.badge.bg};
`;
