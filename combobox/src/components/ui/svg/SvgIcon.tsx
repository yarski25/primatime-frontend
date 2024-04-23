// import useDynamicSvgImport from "../../../hooks/useDynamicSvgImport";
import useDynamicSvgImport from "@/hooks/useDynamicSvgImport";

type Props = {
  iconName: string;
  wrapperStyle?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
};

const SvgIcon = (props: Props) => {
  const { iconName, wrapperStyle, svgProp } = props;
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);
  // console.log(loading);
  return (
    <>
      {loading && (
        <div className="rounded-full bg-slate-400 animate-pulse h-8 w-8"></div>
      )}
      {SvgIcon && (
        <div className={wrapperStyle}>
          <SvgIcon {...svgProp} />
        </div>
      )}
    </>
  );
};

export default SvgIcon;
