"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/content";

// A small laptop on each project card. Every project gets its own animated
// screen; the sequence plays when the card scrolls into view and replays on
// hover, while the laptop tilts in 3D to follow the cursor.
export default function MiniLaptop({ project: p, num }: { project: Project; num: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0); // bump to restart the screen animations

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRun((n) => n + 1);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 18}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 12}deg`);
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };

  const s = p.screen;
  const Screen = SCREENS[p.id] ?? EksScreen;
  return (
    <div
      ref={ref}
      className="laptop-stage"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setRun((n) => n + 1); }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="mini-laptop">
        <div className="ml-lid">
          <div className={`ml-screen ml-${p.id}`} key={run} data-run={run > 0 ? "" : undefined}>
            <div className="ml-bar">
              <span className="ml-dots"><i /><i /><i /></span>
              <span className="ml-url">{s.kicker.toLowerCase().replace(" / ", "/")}/{num}</span>
              <span className="ml-live"><i />LIVE</span>
            </div>
            <Screen title={s.title} />
          </div>
        </div>
        <div className="ml-base"><span /></div>
      </div>
    </div>
  );
}

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

// 01: Kubernetes cluster: pipeline stages light up, then pods come up on three nodes.
function EksScreen({ title }: { title: string }) {
  const stages = ["Build", "Scan", "Push", "Deploy"];
  return (
    <div className="ml-body ml-pad">
      <div className="ml-head"><b>{title}</b><small>EKS · 3 nodes · Helm</small></div>
      <div className="eks-pipe">
        {stages.map((st, i) => (
          <span key={st} className="eks-stage" style={d(i)}><i />{st}</span>
        ))}
      </div>
      <div className="eks-nodes">
        {[0, 1, 2].map((n) => (
          <div key={n} className="eks-node">
            <small>node-{n + 1}</small>
            <span className="eks-pods">
              {Array.from({ length: 6 }, (_, k) => <i key={k} style={d(n * 6 + k)} />)}
            </span>
          </div>
        ))}
      </div>
      <div className="eks-foot">
        <span><b className="ok">18/18</b> pods running</span>
        <span className="chip">Trivy · 0 critical</span>
      </div>
    </div>
  );
}

// 02: HA web app: traffic from the ALB to two AZs; one instance fails, traffic shifts, it recovers.
function HaScreen({ title }: { title: string }) {
  return (
    <div className="ml-body ml-pad">
      <div className="ml-head"><b>{title}</b><small>us-east-1 · 2 AZs</small></div>
      <svg className="ha-diagram" viewBox="0 0 270 112" fill="none">
        <rect x="104" y="2" width="62" height="18" rx="5" className="ha-box" />
        <text x="135" y="14" className="ha-label">Internet</text>
        <path d="M135 20v14" className="ha-wire" />
        <path d="M135 20v14" className="ha-flow" />
        <rect x="92" y="34" width="86" height="20" rx="5" className="ha-box ha-alb" />
        <text x="135" y="47" className="ha-label ha-light">Load Balancer</text>
        <rect x="14" y="62" width="114" height="46" rx="6" className="ha-az" />
        <rect x="142" y="62" width="114" height="46" rx="6" className="ha-az" />
        <text x="22" y="72" className="ha-small">AZ · a</text>
        <text x="150" y="72" className="ha-small">AZ · b</text>
        <path d="M120 54 L71 80" className="ha-wire" />
        <path d="M120 54 L71 80" className="ha-flow ha-flow-a" />
        <path d="M150 54 L199 80" className="ha-wire ha-wire-b" />
        <path d="M150 54 L199 80" className="ha-flow ha-flow-b" />
        <rect x="36" y="78" width="70" height="22" rx="5" className="ha-ec2" />
        <circle cx="46" cy="89" r="3" className="ha-dot" />
        <text x="76" y="92" className="ha-label">EC2 · nginx</text>
        <rect x="164" y="78" width="70" height="22" rx="5" className="ha-ec2 ha-ec2-b" />
        <circle cx="174" cy="89" r="3" className="ha-dot ha-dot-b" />
        <text x="204" y="92" className="ha-label">EC2 · nginx</text>
      </svg>
      <div className="ha-status">
        <span className="ha-msg ha-msg-ok"><b className="ok">●</b> 2/2 healthy targets</span>
        <span className="ha-msg ha-msg-fail"><b className="bad">●</b> AZ-b unhealthy · rerouting</span>
      </div>
    </div>
  );
}

// 03: IAM provisioning: the Python script runs and prints its results line by line.
function IamScreen() {
  const lines: [string, string][] = [
    ["$", "python iam-onboard.py --users 3"],
    ["✓", "created user  dev-asha"],
    ["✓", "created user  dev-ravi"],
    ["✓", "created user  qa-meera"],
    ["✓", "console login · reset on first use"],
    ["✓", "attached  ReadOnlyAccess"],
    ["→", "done in 4.2s · 90% less setup time"],
  ];
  return (
    <div className="ml-body iam-term">
      {lines.map(([mark, text], i) => (
        <p key={text} className={`iam-line${mark === "$" ? " cmd" : mark === "→" ? " done" : ""}`} style={d(i)}>
          <b>{mark}</b> {text}
        </p>
      ))}
      <span className="iam-cursor" />
    </div>
  );
}

// 04: Auto-tagging: an event travels CloudTrail → EventBridge → Lambda, then tags land on the resource.
function TagScreen({ title }: { title: string }) {
  const steps = ["CloudTrail", "EventBridge", "λ Lambda"];
  return (
    <div className="ml-body ml-pad">
      <div className="ml-head"><b>{title}</b><small>RunInstances event</small></div>
      <div className="tag-flow">
        {steps.map((st, i) => (
          <span key={st} className="tag-step" style={d(i)}>{st}</span>
        ))}
        <span className="tag-res" style={d(3)}>
          <b>EC2 · i-0a3f9</b>
          <span className="tag-chips">
            <i style={d(0)}>Owner: faseeh</i>
            <i style={d(1)}>CreatedBy: iam/faseeh</i>
          </span>
        </span>
      </div>
      <div className="tag-meter">
        <span><b>Tagging compliance</b><b className="ok">100%</b></span>
        <span className="tag-bar"><i /></span>
      </div>
    </div>
  );
}

const SCREENS: Record<string, (props: { title: string }) => React.ReactElement> = {
  "netflix-eks": EksScreen,
  "aws-infra": HaScreen,
  "iam-automation": IamScreen,
  "auto-tagging": TagScreen,
};
