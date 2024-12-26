import * as go from 'gojs';

export const isAssistant = (n: any) => {
  if (n === null) return false;
  return n.data.isAssistant;
}

export class SideTreeLayout extends go.TreeLayout {
    constructor(init: any) {
        super();
        if (init) Object.assign(this, init);
    }

    override makeNetwork(coll: any): any {
        const net = super.makeNetwork(coll);
        const vertexcoll = new go.Set();
        vertexcoll.addAll(net.vertexes);
        for (const it = vertexcoll.iterator; it.next(); ) {
            const parent = it.value as any;
            let acount = 0;
            const ait = parent.destinationVertexes;
            while (ait.next()) {
                if (isAssistant(ait.value.node)) acount++;
            }
            if (acount > 0) {
                const asstedges = new go.Set() as any;
                const childedges = new go.Set() as any;
                let eit = parent.destinationEdges;
                while (eit.next()) {
                    const e = eit.value;
                    if (isAssistant(e.toVertex.node)) {
                        asstedges.add(e);
                    } else {
                    childedges.add(e);
                    }
                }
                eit = asstedges.iterator;
                while (eit.next()) {
                    parent.deleteDestinationEdge(eit.value);
                }
                eit = childedges.iterator;
                while (eit.next()) {
                    parent.deleteDestinationEdge(eit.value);
                }
                if (acount % 2 == 1) {
                    const dummy = net.createVertex();
                    net.addVertex(dummy);
                    net.linkVertexes(parent, dummy, asstedges.first().link);
                }
                eit = asstedges.iterator;
                while (eit.next()) {
                    parent.addDestinationEdge(eit.value);
                }
                const subst = net.createVertex();
                net.addVertex(subst);
                eit = childedges.iterator;
                while (eit.next()) {
                    const ce = eit.value;
                    ce.fromVertex = subst;
                    subst.addDestinationEdge(ce);
                }
                const newedge = net.linkVertexes(parent, subst, null);
            }
        }
        return net;
    }

    override assignTreeVertexValues(v: any) {
        let any = false;
        const children = v.children;
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            if (isAssistant(c.node)) {
                any = true;
                break;
            }
        }
        if (any) {
            v.alignment = go.TreeAlignment.Bus; 
            v.nodeSpacing = 50;
        } else if (v.node == null && v.childrenCount > 0) {
            v.layerSpacing = 0;
        }
    }

    override commitLinks() {
        super.commitLinks();
        const eit = this?.network?.edges?.iterator ?? null;
        if (eit === null) {
            return;
        }
        while (eit.next()) {
            const e = eit.value;
            if (e.link == null) continue;
            const r = e.link;
            const subst = e.fromVertex as any;
            if (subst === null) {
                return;
            }
            if (subst.node == null && r.routing == go.Routing.Orthogonal) {
                r.updateRoute();
                r.startRoute();
                const p1 = subst.center;
                const p2 = r.getPoint(2).copy();
                const p3 = r.getPoint(3).copy();
                const p5 = r.getPoint(r.pointsCount - 1);
                let dist = 10;
                if (subst.angle == 270 || subst.angle == 180) dist = -20;
                if (subst.angle == 90 || subst.angle == 270) {
                    p2.y = p5.y - dist; 
                    p3.y = p5.y - dist; 
                } else {
                    p2.x = p5.x - dist;
                    p3.x = p5.x - dist;
                }
                r.setPoint(2, p2);
                r.setPoint(3, p3);
                r.commitRoute();
            }
            
        }

    }

}
