import React from "react";

import { Card, CardBody, Tab, Tabs } from "@heroui/react";

export interface TabItem {
  key: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface ReusableTabsProps {
  tabs: TabItem[];
  defaultSelectedKey?: string;
  selectedKey?: string;
  onSelectionChange?: (key: string) => void;
  variant?: "solid" | "underlined" | "bordered" | "light";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
  tabsClassName?: string;
  cardClassName?: string;
  showCard?: boolean;
  ariaLabel?: string;
}

export const ReusableTabs: React.FC<ReusableTabsProps> = ({
  tabs,
  defaultSelectedKey,
  selectedKey,
  onSelectionChange,
  variant = "solid",
  color = "default",
  size = "md",
  radius = "md",
  className = "",
  tabsClassName = "",
  cardClassName = "",
  showCard = true,
  ariaLabel = "Tabs",
}) => {
  const [internalSelected, setInternalSelected] = React.useState(defaultSelectedKey || tabs[0]?.key || "");

  const currentSelected = selectedKey !== undefined ? selectedKey : internalSelected;

  const handleSelectionChange = (key: string) => {
    if (selectedKey === undefined) {
      setInternalSelected(key);
    }
    onSelectionChange?.(key);
  };

  const TabContent = ({ children }: { children: React.ReactNode }) => {
    if (!showCard) {
      return <div className={cardClassName}>{children}</div>;
    }

    return (
      <Card className={cardClassName}>
        <CardBody>{children}</CardBody>
      </Card>
    );
  };

  return (
    <div className={`flex w-full flex-col ${className}`}>
      <Tabs
        aria-label={ariaLabel}
        selectedKey={currentSelected}
        onSelectionChange={(key) => handleSelectionChange(key as string)}
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        className={tabsClassName}
        classNames={{
          cursor: "bg-white text-primary",
          tabContent: "text-gray-300 group-data-[selected=true]:text-primary",
          tabList: "bg-primary",
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title} isDisabled={tab.disabled}>
            <TabContent>{tab.content}</TabContent>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
