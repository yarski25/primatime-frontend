import React, { useEffect, useRef, useState } from "react";

// const dynamicSvgImport = async (iconName: string): Promise<void> => {
//   const module = await import(`../assets/icons/${iconName}.svg?react`);
//   return module;
// };

const useDynamicSvgImport = (
  iconName: string
  //   iconPath: string = `../assets/icons`
) => {
  const importedIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(true);
    const importSvgIcon = async (): Promise<void> => {
      try {
        importedIconRef.current = (
          await import(`../assets/icons/${iconName}.svg?react`)
        ).default;
        // importedIconRef.current = dynamicSvgImport(iconName);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    importSvgIcon();
  }, [iconName]);

  return { error, loading, SvgIcon: importedIconRef.current };
};

export default useDynamicSvgImport;
