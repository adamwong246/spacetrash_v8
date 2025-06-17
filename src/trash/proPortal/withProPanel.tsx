import React from "react";
import { Rnd } from "react-rnd";

/**
 * Higher-Order Component that wraps a component and allows it to be resized and dragged
 * Will store its size / position / z-index relative to other Pro Panels if it is a direct child of a ProPanelContainer component.
 * @param {*} WrappedComponent
 * @returns
 */
const withProPanel = (WrappedComponent) => {
    const HOC = (props: { defaults, bringPanelToTop, storePanelPosition, zPanels, panelPositions }) => {
        // Read from a panel's stored position if it has been opened before
        const prevPositions = props.panelPositions[props.defaults.name] ? props.panelPositions[props.defaults.name] : props.defaults;

        return (
            <Rnd
                default={prevPositions}
                style={{ zIndex: 100 + props.zPanels.indexOf(props.defaults.name) }}
                onMouseDown={() => props.bringPanelToTop(props.defaults.name)}
                bounds="parent"
                onResizeStop={(a, b, c, delta, position) =>
                  props.storePanelPosition({
                        ...prevPositions,
                        height: prevPositions.height + delta.height,
                        width: prevPositions.width + delta.width,
                        x: position.x,
                        y: position.y,
                    })
                }
                onDragStop={(a, data) =>
                  props.storePanelPosition({
                        ...prevPositions,
                        x: data.x,
                        y: data.y,
                    })
                }
            >
                <WrappedComponent {...props} />
            </Rnd>
        );
    };

    return HOC;
};

export default withProPanel;
