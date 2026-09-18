export const manifest = {
  screens: {
    scr_hrjrb0: { name: "Overview", route: "/", position: { "x": 160, "y": 220 } },
    scr_srl8yn: { name: "Principles", route: "/principles", position: { "x": 1560, "y": 220 } },
    scr_shbv5u: { name: "Visual direction", route: "/direction", position: { "x": 2960, "y": 220 } },
    scr_93opzz: { name: "Token architecture", route: "/foundations/tokens", position: { "x": 160, "y": 2200 } },
    scr_7j0yz3: { name: "Colour", route: "/foundations/color", position: { "x": 1560, "y": 2200 } },
    scr_nunhlz: { name: "Typography", route: "/foundations/typography", position: { "x": 2960, "y": 2200 } },
    scr_csx0yn: { name: "Spacing & density", route: "/foundations/spacing", position: { "x": 4360, "y": 2200 } },
    scr_0ok2w9: { name: "Border", route: "/foundations/border", position: { "x": 5760, "y": 2200 } },
    scr_2370j9: { name: "Elevation", route: "/foundations/elevation", position: { "x": 7160, "y": 2200 } },
    scr_wc5ztw: { name: "Radius", route: "/foundations/radius", position: { "x": 8560, "y": 2200 } },
    scr_xdp1ri: { name: "Layout", route: "/foundations/layout", position: { "x": 9960, "y": 2200 } },
    scr_24tlhk: { name: "Motion", route: "/foundations/motion", position: { "x": 11360, "y": 2200 } },
    scr_xfpapl: { name: "Behavioural framework", route: "/patterns/framework", position: { "x": 160, "y": 4180 } },
    scr_8bzosv: { name: "Evidence and review", route: "/patterns/evidence", position: { "x": 1560, "y": 4180 } },
    scr_oswt5p: { name: "AI interaction", route: "/patterns/ai", position: { "x": 2960, "y": 4180 } },
    scr_m4u65e: { name: "Candidate workspace", route: "/screens/workspace", position: { "x": 160, "y": 8140 } },
    scr_0ex7x7: { name: "Reviewer evidence", route: "/screens/reviewer", position: { "x": 1560, "y": 8140 } },
    scr_h32qfy: { name: "Candidate report", route: "/screens/report", position: { "x": 2960, "y": 8140 } },
    scr_rtqk45: { name: "Candidate comparison", route: "/screens/comparison", position: { "x": 4360, "y": 8140 } },
    scr_p00j2r: { name: "Assessment administration", route: "/screens/admin", position: { "x": 5760, "y": 8140 } },
    scr_1em0v2: { name: "Contrast audit", route: "/standards/contrast", position: { "x": 160, "y": 6160 } },
    scr_gz9h16: { name: "Accessibility", route: "/standards/accessibility", position: { "x": 1560, "y": 6160 } },
    scr_oj93yz: { name: "Content and tone", route: "/standards/content", position: { "x": 2960, "y": 6160 } },
    scr_4j616z: { name: "QA checklist", route: "/standards/qa", position: { "x": 4360, "y": 6160 } }
  },
  sections: {
    sec_4tj9iw: { name: "Introduction", x: 0, y: 0, width: 4320, height: 1180 },
    sec_v7oji7: { name: "Foundations", x: 0, y: 1980, width: 12720, height: 1180 },
    sec_ildla8: { name: "Patterns", x: 0, y: 3960, width: 4320, height: 1180 },
    sec_jq7uz3: { name: "Standards", x: 0, y: 5940, width: 5720, height: 1180 },
    sec_ejt32x: { name: "Application screens", x: 0, y: 7920, width: 7120, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_4tj9iw", children: [
    { kind: "screen", id: "scr_hrjrb0" },
    { kind: "screen", id: "scr_srl8yn" },
    { kind: "screen", id: "scr_shbv5u" }]
  },
  { kind: "section", id: "sec_v7oji7", children: [
    { kind: "screen", id: "scr_93opzz" },
    { kind: "screen", id: "scr_7j0yz3" },
    { kind: "screen", id: "scr_nunhlz" },
    { kind: "screen", id: "scr_csx0yn" },
    { kind: "screen", id: "scr_0ok2w9" },
    { kind: "screen", id: "scr_2370j9" },
    { kind: "screen", id: "scr_wc5ztw" },
    { kind: "screen", id: "scr_xdp1ri" },
    { kind: "screen", id: "scr_24tlhk" }]
  },
  { kind: "section", id: "sec_ildla8", children: [
    { kind: "screen", id: "scr_xfpapl" },
    { kind: "screen", id: "scr_8bzosv" },
    { kind: "screen", id: "scr_oswt5p" }]
  },
  { kind: "section", id: "sec_jq7uz3", children: [
    { kind: "screen", id: "scr_1em0v2" },
    { kind: "screen", id: "scr_gz9h16" },
    { kind: "screen", id: "scr_oj93yz" },
    { kind: "screen", id: "scr_4j616z" }]
  },
  { kind: "section", id: "sec_ejt32x", children: [
    { kind: "screen", id: "scr_m4u65e" },
    { kind: "screen", id: "scr_0ex7x7" },
    { kind: "screen", id: "scr_h32qfy" },
    { kind: "screen", id: "scr_rtqk45" },
    { kind: "screen", id: "scr_p00j2r" }]
  }]

};