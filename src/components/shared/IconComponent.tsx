import * as SimpleIcons from "react-icons/si";
// Using type-only import to comply with 'verbatimModuleSyntax'
import type { IconBaseProps } from "react-icons";

interface Props extends IconBaseProps {
  iconName: string;
}

/**
 * Component to dynamically render SimpleIcons (si) 
 * based on the icon name provided in the data files.
 */
export const IconComponent = ({ iconName, ...props }: Props) => {
  // Look up the icon in the SimpleIcons object using the string name as a key
  const Icon = (SimpleIcons as any)[iconName];

  // If the icon is not found, fallback to SiJavascript to prevent UI crashes
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in react-icons/si`);
    return <SimpleIcons.SiJavascript {...props} />;
  }

  return <Icon {...props} />;
};