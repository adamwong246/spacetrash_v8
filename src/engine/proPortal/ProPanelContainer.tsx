import React, { useState } from "react";

/**
 * Container that will store and remember the relative positions and z-indexes of child components.
 * This component defaults to 100% of the height and width of its parent container.
 * @param {*} props
 * @returns
 */
const ProPanelContainer = (props) => {
    const [zPanels, setZPanels] = useState<any[]>([]);
    const [panelPositions, setPanelPositions] = useState({});

    const bringPanelToTop = (name) => {
        let currentOrder = [...zPanels];
        const currentIndex = currentOrder.indexOf(name);
        if (currentIndex >= 0) {
            currentOrder.splice(currentIndex, 1);
        }
        currentOrder.push(name);
        setZPanels(currentOrder);
    };

    const storePanelPosition = (positionData) => {
        let currentPanelPositions = { ...panelPositions };
        currentPanelPositions[positionData.name] = positionData;
        setPanelPositions(currentPanelPositions);
    };

  const renderChildren = () => {
        return React.Children.map(props.children, (child) => {
            if (!child) return null;
            return React.cloneElement(child, {
                bringPanelToTop,
                storePanelPosition,
                zPanels,
                panelPositions,
            });
        });
    };

    return (
        <div id="panel-pro-container" style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
            {renderChildren()}
        </div>
    );
};

export default ProPanelContainer;
