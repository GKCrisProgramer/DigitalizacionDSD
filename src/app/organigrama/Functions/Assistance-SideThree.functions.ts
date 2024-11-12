// side-tree-layout.ts
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
        // copy the collection of TreeVertexes, because we will modify the network
        const vertexcoll = new go.Set(/*go.TreeVertex*/);
        vertexcoll.addAll(net.vertexes);
        for (const it = vertexcoll.iterator; it.next(); ) {
            const parent = it.value as any;
            // count the number of assistants
            let acount = 0;
            const ait = parent.destinationVertexes;
            while (ait.next()) {
                if (isAssistant(ait.value.node)) acount++;
            }
            // if a vertex has some number of children that should be assistants
            if (acount > 0) {
                // remember the assistant edges and the regular child edges
                const asstedges = new go.Set(/*go.TreeEdge*/) as any;
                const childedges = new go.Set(/*go.TreeEdge*/) as any;
                let eit = parent.destinationEdges;
                while (eit.next()) {
                    const e = eit.value;
                    if (isAssistant(e.toVertex.node)) {
                        asstedges.add(e);
                    } else {
                    childedges.add(e);
                    }
                }
                // first remove all edges from PARENT
                eit = asstedges.iterator;
                while (eit.next()) {
                    parent.deleteDestinationEdge(eit.value);
                }
                eit = childedges.iterator;
                while (eit.next()) {
                    parent.deleteDestinationEdge(eit.value);
                }
                // if the number of assistants is odd, add a dummy assistant, to make the count even
                if (acount % 2 == 1) {
                    const dummy = net.createVertex();
                    net.addVertex(dummy);
                    net.linkVertexes(parent, dummy, asstedges.first().link);
                }
                // now PARENT should get all of the assistant children
                eit = asstedges.iterator;
                while (eit.next()) {
                    parent.addDestinationEdge(eit.value);
                }
                // create substitute vertex to be new parent of all regular children
                const subst = net.createVertex();
                net.addVertex(subst);
                // reparent regular children to the new substitute vertex
                eit = childedges.iterator;
                while (eit.next()) {
                    const ce = eit.value;
                    ce.fromVertex = subst;
                    subst.addDestinationEdge(ce);
                }
                // finally can add substitute vertex as the final odd child,
                // to be positioned at the end of the PARENT's immediate subtree.
                const newedge = net.linkVertexes(parent, subst, null);
            }
        }
        return net;
    }

    override assignTreeVertexValues(v: any) {
        // if a vertex has any assistants, use Bus alignment
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
            // this is the parent for the assistant(s)
            v.alignment = go.TreeAlignment.Bus; // this is required
            v.nodeSpacing = 50; // control the distance of the assistants from the parent's main links
        } else if (v.node == null && v.childrenCount > 0) {
            // found the substitute parent for non-assistant children
            //v.alignment = go.TreeAlignment.CenterChildren;
            //v.breadthLimit = 3000;
            v.layerSpacing = 0;
        }
    }

    override commitLinks() {
        super.commitLinks();
        // make sure the middle segment of an orthogonal link does not cross over the assistant subtree
        const eit = this?.network?.edges?.iterator ?? null;
        if (eit === null) {
            return;
        }
        while (eit.next()) {
            const e = eit.value;
            if (e.link == null) continue;
            const r = e.link;
            // does this edge come from a substitute parent vertex?
            const subst = e.fromVertex as any;
            if (subst === null) {
                return;
            }
            if (subst.node == null && r.routing == go.Routing.Orthogonal) {
                r.updateRoute();
                r.startRoute();
                // middle segment goes from point 2 to point 3
                const p1 = subst.center; // assume artificial vertex has zero size
                const p2 = r.getPoint(2).copy();
                const p3 = r.getPoint(3).copy();
                const p5 = r.getPoint(r.pointsCount - 1);
                let dist = 10;
                if (subst.angle == 270 || subst.angle == 180) dist = -20;
                if (subst.angle == 90 || subst.angle == 270) {
                    p2.y = p5.y - dist; // (p1.y+p5.y)/2;
                    p3.y = p5.y - dist; // (p1.y+p5.y)/2;
                } else {
                    p2.x = p5.x - dist; // (p1.x+p5.x)/2;
                    p3.x = p5.x - dist; // (p1.x+p5.x)/2;
                }
                r.setPoint(2, p2);
                r.setPoint(3, p3);
                r.commitRoute();
            }
            
        }

    }

}
