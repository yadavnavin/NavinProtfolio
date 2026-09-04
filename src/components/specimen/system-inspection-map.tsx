import {
  HERO_TOPOLOGY_VIEWBOX,
  heroTopologyNodes,
  heroTopologyPackets,
  heroTopologyRoutes,
} from "@/data/hero-topology";

type SystemInspectionMapProps = {
  activeRouteId: string;
  feedPath: string;
  magnified?: boolean;
};

export function SystemInspectionMap({
  activeRouteId,
  feedPath,
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
                cx={node.x}
                cy={node.y}
                r="3.2"
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
                x={node.x - 3}
                y={node.y - 3}
                width="6"
                height="6"
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
                d={`M${node.x - 3} ${node.y - 3}L${node.x + 3} ${node.y + 3}M${node.x + 3} ${node.y - 3}L${node.x - 3} ${node.y + 3}`}
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
                  cx={node.x}
                  cy={node.y}
                  r="4.5"
                />
                <circle
                  data-map-node=""
                  data-node-x={node.x}
                  data-node-y={node.y}
                  cx={node.x}
                  cy={node.y}
                  r="1"
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
              x={node.x - 3}
              y={node.y - 3}
              width="6"
              height="6"
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
        <path
          className="system-map-current"
          data-current-map=""
          d={feedPath}
          pathLength="1"
        />
      ) : null}
    </svg>
  );
}
