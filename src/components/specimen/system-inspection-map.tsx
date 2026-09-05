import {
  HERO_TOPOLOGY_VIEWBOX,
  type HeroTopologySignalNode,
  heroTopologyNodes,
  heroTopologyPackets,
  heroTopologyRoutes,
} from "@/data/hero-topology";

type SystemInspectionMapProps = {
  activeRouteId: string;
  feedPath: string;
  signalNodes: readonly HeroTopologySignalNode[];
  magnified?: boolean;
};

export function SystemInspectionMap({
  activeRouteId,
  feedPath,
  signalNodes,
  magnified = false,
}: SystemInspectionMapProps) {
  return (
    <svg
      className="system-map"
      data-map-surface={magnified ? "lens" : "background"}
      viewBox={`0 0 ${HERO_TOPOLOGY_VIEWBOX.width} ${HERO_TOPOLOGY_VIEWBOX.height}`}
      preserveAspectRatio="none"
      role={magnified ? undefined : "img"}
      aria-hidden={magnified ? "true" : undefined}
      aria-label={
        magnified
          ? undefined
          : "Interactive system topology connecting interface, API, services, data, and automation."
      }
    >
      <g className="system-map-routes">
        {heroTopologyRoutes.map((route) => (
          <path
            key={route.id}
            className={`system-map-route system-map-route-${route.tone}`}
            data-map-route=""
            data-reveal-order={route.revealOrder}
            data-route-active={route.id === activeRouteId ? "" : undefined}
            d={route.d}
            pathLength="1"
          />
        ))}
      </g>

      {!magnified ? (
        <g className="system-map-energy">
          {heroTopologyRoutes.map((route) => (
            <path
              key={route.id}
              data-map-energy=""
              data-reveal-order={route.revealOrder}
              d={route.d}
              pathLength="1"
            />
          ))}
        </g>
      ) : null}

      <g className="system-map-nodes">
        {heroTopologyNodes.map((node) => {
          if (node.shape === "circle") {
            return (
              <circle
                key={node.id}
                data-map-node=""
                data-node-x={node.x}
                data-node-y={node.y}
                data-reveal-order={node.revealOrder}
                cx={node.x}
                cy={node.y}
                r="2.8"
              />
            );
          }

          if (node.shape === "diamond") {
            return (
              <rect
                key={node.id}
                data-map-node=""
                data-node-x={node.x}
                data-node-y={node.y}
                data-reveal-order={node.revealOrder}
                x={node.x - 2.6}
                y={node.y - 2.6}
                width="5.2"
                height="5.2"
                transform={`rotate(45 ${node.x} ${node.y})`}
              />
            );
          }

          if (node.shape === "cross") {
            return (
              <path
                key={node.id}
                data-map-node=""
                data-node-x={node.x}
                data-node-y={node.y}
                data-reveal-order={node.revealOrder}
                d={`M${node.x - 2.2} ${node.y - 2.2}L${node.x + 2.2} ${node.y + 2.2}M${node.x + 2.2} ${node.y - 2.2}L${node.x - 2.2} ${node.y + 2.2}`}
              />
            );
          }

          if (node.shape === "port") {
            return (
              <g key={node.id}>
                <circle
                  data-map-node=""
                  data-node-x={node.x}
                  data-node-y={node.y}
                  data-reveal-order={node.revealOrder}
                  cx={node.x}
                  cy={node.y}
                  r="3.8"
                />
                <circle
                  data-map-node=""
                  data-node-x={node.x}
                  data-node-y={node.y}
                  data-reveal-order={node.revealOrder}
                  cx={node.x}
                  cy={node.y}
                  r="0.8"
                />
              </g>
            );
          }

          return (
            <rect
              key={node.id}
              data-map-node=""
              data-node-x={node.x}
              data-node-y={node.y}
              data-reveal-order={node.revealOrder}
              x={node.x - 2.6}
              y={node.y - 2.6}
              width="5.2"
              height="5.2"
            />
          );
        })}
      </g>

      <g className="system-map-packets">
        {heroTopologyPackets.map((packet) => (
          <g
            key={packet.id}
            data-packet=""
            data-map-packet=""
            data-packet-active={
              packet.routeId === activeRouteId ? "" : undefined
            }
            transform={`translate(${packet.x} ${packet.y})`}
          >
            {[0, 1, 2].map((index) =>
              packet.axis === "horizontal" ? (
                <rect
                  key={index}
                  x={index * 9}
                  y="-1.2"
                  width="4"
                  height="2.4"
                  rx="1.2"
                />
              ) : (
                <rect
                  key={index}
                  x="-1.2"
                  y={index * 9}
                  width="2.4"
                  height="4"
                  rx="1.2"
                />
              ),
            )}
          </g>
        ))}
      </g>

      {!magnified ? (
        <g className="system-map-signal">
          <path
            className="system-map-current"
            data-current-map=""
            d={feedPath}
            pathLength="1"
          />
          {signalNodes.map((node) => (
            <circle
              key={`${node.x}-${node.y}`}
              className="system-map-current-node"
              data-map-node=""
              data-current-node=""
              data-current-node-filled={node.filled ? "" : undefined}
              cx={node.x}
              cy={node.y}
              r={node.filled ? 3.4 : 3.8}
            />
          ))}
        </g>
      ) : null}
    </svg>
  );
}
