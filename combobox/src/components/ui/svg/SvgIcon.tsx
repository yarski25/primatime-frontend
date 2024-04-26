import useDynamicSvgImport from "@/hooks/useDynamicSvgImport";

type Props = {
  iconName: string;
  wrapperStyle?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
  onClick?: (event: React.MouseEvent) => void;
};

const SvgIcon = (props: Props) => {
  const { iconName, wrapperStyle, svgProp } = props;
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);

  return (
    <>
      {loading && (
        <div className="rounded-full bg-slate-400 animate-pulse h-8 w-8"></div>
      )}
      {SvgIcon && (
        <div className={wrapperStyle} onClick={props.onClick}>
          <SvgIcon {...svgProp} />
        </div>
      )}
    </>
  );
};

export default SvgIcon;
