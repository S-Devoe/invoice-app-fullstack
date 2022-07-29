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
      <div className="color">{getStatus()}</div>
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
  color: ${({ status, theme }): any => {
    if (status === "paid") return "#33d69f";
    if (status === "pending") return "#ff8f00";
    if (status === "draft") return theme.color.badge.draft;
  }};
  background: ${(props): any => {
    if (props.status === "paid") return "#33d69f0f";
    if (props.status === "pending") return "#ff8f000f";
    if (props.status === "draft") return props.theme.color.badge.draftBg;
  }};
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
