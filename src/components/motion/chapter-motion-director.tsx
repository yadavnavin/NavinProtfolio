"use client";

import { animate, inView } from "motion";
import { useEffect } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ChapterMotionDirector() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observers: Array<() => void> = [];
    const animations: Array<{ cancel: () => void }> = [];

    const watch = (
      selector: string,
      onEnter: (element: Element) => void,
      amount = 0.3,
    ) => {
      const element = document.querySelector(selector);
      if (!element) return;

      observers.push(
        inView(
          element,
          (visibleElement) => {
            onEnter(visibleElement);
          },
          { amount },
        ),
      );
    };

    watch(".isolation-diagram", (diagram) => {
      const layers = [
        diagram.querySelector(".isolation-shared"),
        diagram.querySelector(".isolation-access"),
      ].filter((element): element is Element => element !== null);
      const lanes = Array.from(
        diagram.querySelectorAll(".isolation-lanes > li"),
      );

      layers.forEach((layer, index) => {
        animations.push(
          animate(
            layer,
            {
              clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
              opacity: [0.55, 1],
            },
            { duration: 0.75, delay: index * 0.18, ease: easeOut },
          ),
        );
      });

      lanes.forEach((lane, index) => {
        animations.push(
          animate(
            lane,
            { opacity: [0.28, 1], y: [18, 0] },
            { duration: 0.7, delay: 0.5 + index * 0.11, ease: easeOut },
          ),
        );
      });
    });

    const workflowPath = document.querySelector<SVGPathElement>(
      ".workflow-route path",
    );
    if (workflowPath) {
      workflowPath.setAttribute("pathLength", "1");
      workflowPath.style.strokeDasharray = "1";
      workflowPath.style.strokeDashoffset = "1";
    }

    watch(".workflow-sequence-field", (field) => {
      const stages = Array.from(
        field.querySelectorAll("[data-workflow-stage]"),
      );

      if (workflowPath) {
        animations.push(
          animate(
            workflowPath,
            { strokeDashoffset: [1, 0] },
            { duration: 1.35, ease: easeOut },
          ),
        );
      }

      stages.forEach((stage, index) => {
        animations.push(
          animate(
            stage,
            { opacity: [0.3, 1], y: [12, 0] },
            { duration: 0.55, delay: 0.12 + index * 0.14, ease: easeOut },
          ),
        );
      });
    });

    const documentPaths = Array.from(
      document.querySelectorAll<SVGPathElement>(
        ".document-fanout-routes path:not(.document-entry-route)",
      ),
    );
    documentPaths.forEach((path) => {
      path.setAttribute("pathLength", "1");
      path.style.strokeDasharray = "1";
      path.style.strokeDashoffset = "1";
    });

    watch(".document-fanout-field", (field) => {
      const destinations = Array.from(
        field.querySelectorAll(".document-destinations > li"),
      );

      documentPaths.forEach((path, index) => {
        animations.push(
          animate(
            path,
            { strokeDashoffset: [1, 0] },
            { duration: 0.9, delay: index * 0.13, ease: easeOut },
          ),
        );
      });

      destinations.forEach((destination, index) => {
        animations.push(
          animate(
            destination,
            { opacity: [0.34, 1], x: [14, 0] },
            { duration: 0.6, delay: 0.25 + index * 0.12, ease: easeOut },
          ),
        );
      });
    });

    watch(
      ".contact-footer",
      (footer) => {
        const route = footer.querySelector(".contact-route");
        const terminal = footer.querySelector(".contact-route-terminal");

        if (route) {
          animations.push(
            animate(
              route,
              {
                clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
              },
              { duration: 0.9, ease: easeOut },
            ),
          );
        }

        if (terminal) {
          animations.push(
            animate(
              terminal,
              { opacity: [0, 1], x: [-18, 0] },
              { duration: 0.55, delay: 0.7, ease: easeOut },
            ),
          );
        }
      },
      0.2,
    );

    return () => {
      observers.forEach((stop) => {
        stop();
      });
      animations.forEach((animation) => {
        animation.cancel();
      });
    };
  }, []);

  return null;
}
