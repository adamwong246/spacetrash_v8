import Graph from "graphology";

/**
 * Interface for the rendering options.
 */
interface RenderOptions {
  backgroundColor?: string;
  nodes?: {
    defaultColor?: string;
    radius?: number; // Optional radius for nodes
  };
  edges?: {
    defaultColor?: string;
    width?: number; // Optional width for edges
  };
}

/**
 * Renders a graphology graph to an HTML canvas.
 * @param graph The graphology graph to render.
 * @param canvas The HTML canvas element to draw on.
 * @param options Optional settings for rendering.
 */
export function renderGraphToCanvas(
  graph: Graph,
  ctx: CanvasRenderingContext2D,
  options: RenderOptions = {}
): void {
  
  if (!ctx) {
    console.error('Could not get 2D rendering context for canvas.');
    return;
  }

  const canvas = ctx.canvas;

  // Set default options and merge with provided options
  const defaultOptions: RenderOptions = {
    backgroundColor: '#FFFFFFFF', // Default white background
    nodes: {
      defaultColor: '#FF0000', // Default red nodes
      radius: 10,
    },
    edges: {
      defaultColor: '#0000FF', // Default blue edges
      width: 1,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    nodes: {
      ...defaultOptions.nodes,
      ...options.nodes,
    },
    edges: {
      ...defaultOptions.edges,
      ...options.edges,
    },
  };

  // 1. Draw Background
  if (mergedOptions.backgroundColor) {
    ctx.fillStyle = mergedOptions.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    // Clear the canvas if no background color is set
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // 2. Draw Edges
  graph.forEachEdge((edgeKey, attributes, sourceKey, targetKey, sourceAttributes, targetAttributes) => {
    // Check if source and target node positions are defined
    if (sourceAttributes.x !== undefined && sourceAttributes.y !== undefined &&
        targetAttributes.x !== undefined && targetAttributes.y !== undefined) {
      ctx.beginPath();
      ctx.moveTo(sourceAttributes.x as number, sourceAttributes.y as number);
      ctx.lineTo(targetAttributes.x as number, targetAttributes.y as number);
      ctx.strokeStyle = attributes.color || mergedOptions.edges?.defaultColor || '#000000'; // Allow edge-specific color, default to options, then black
      ctx.lineWidth = attributes.width || mergedOptions.edges?.width || 1; // Allow edge-specific width, default to options, then 1
      ctx.stroke();
    }
  });

  // 3. Draw Nodes
  graph.forEachNode((nodeKey, attributes) => {
    // Check if node position is defined
    if (attributes.x !== undefined && attributes.y !== undefined) {
      ctx.beginPath();
      const nodeRadius = attributes.radius || mergedOptions.nodes?.radius || 10;
      ctx.arc(attributes.x as number, attributes.y as number, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = attributes.color || mergedOptions.nodes?.defaultColor || '#000000'; // Allow node-specific color, default to options, then black
      ctx.fill();
      ctx.strokeStyle = '#000000'; // Default stroke color
      ctx.lineWidth = 1; // Default stroke width
      ctx.stroke();

      // Optionally draw node labels
      if (attributes.label) {
        ctx.fillStyle = 'black'; // Label color
        ctx.font = '12px Arial'; // Label font
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(attributes.label as string, attributes.x as number, (attributes.y as number) + nodeRadius + 5);
      }
    }
  });
}
