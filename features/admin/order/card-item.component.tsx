type CardItemProps = {
  title: string;
  value: string;
  classNames?: {
    title?: string;
    value?: string;
  };
  onClick?: (value: string) => void;
};

export default function CardItem({
  title,
  value,
  classNames,
  onClick: handleOnClick,
}: CardItemProps) {
  return (
    <span
      onClick={() => (handleOnClick ? handleOnClick(value) : undefined)}
      className="flex flex-wrap justify-between gap-x-2 px-2 rounded-md hover:bg-light hover:cursor-pointer"
    >
      <span className={classNames?.title ? classNames.title : "font-bold"}>
        {title}
      </span>
      <span className={classNames?.value}>{value}</span>
    </span>
  );
}
