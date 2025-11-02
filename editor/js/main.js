function newId() {
    return Date.now() + nextId++;
}
function cloneObject(e) {
    let t = null,
        a = !1;
    "rotatingLava" === e.type && e.point && e.point.rotLava === e && ((t = e.point), (a = !0), delete e.point.rotLava);
    const s = JSON.parse(JSON.stringify(e));
    if (a && t) {
        const e = s.point;
        e && ((e.rotLava = s), (s.point = e));
    }
    return "teleporter" === s.type && (s.id = newId()), s;
}
function targetedObject(e) {
    for (let t of types) {
        let a = getObjects(t);
        for (let s = a.length - 1; s >= 0; s--) {
            let n = a[s],
                [{ x: c, y: o }, { x: r, y: i }] = points("rotLavaPoint" === t ? { pos: n, size: { x: 0, y: 0 } } : n),
                l = { x: e.pageX, y: e.pageY };
            if ("text" !== t) {
                if ("turret" !== t) {
                    if ("rotLavaPoint" !== t) {
                        if (
                            pointInRect(
                                l,
                                { x: c - selectBuffer, y: o - selectBuffer },
                                { x: r + selectBuffer, y: i + selectBuffer }
                            )
                        )
                            return n;
                    } else if (pointInCircle(l, { x: c, y: o }, 0.5 * camScale + selectBuffer)) return n;
                } else if (pointInCircle(l, { x: c, y: o }, 3 * camScale + selectBuffer)) return n;
            } else if (pointInCircle(l, { x: c, y: o }, 5 * camScale + selectBuffer)) return n;
        }
    }
    return null;
}
canvas.addEventListener("wheel", (e) => {
    if (e.ctrlKey) return;
    let t = 0.85 ** (e.deltaY / 125),
        a = (e.pageX - canvas.width / 2) / camScale + camX,
        s = (e.pageY - canvas.height / 2) / camScale + camY;
    (camX = (t * a - a + camX) / t), (camY = (t * s - s + camY) / t), (camScale *= t);
}),
    canvas.addEventListener("mousedown", (e) => {
        if ((1 === e.button && e.preventDefault(), 0 !== e.button)) return;
        let t = targetedObject(e),
            a = (e) => {};
        if (t) {
            selectedObject && "element" in selectedObject && hide(selectedObject.element),
                "rotLavaPoint" === t.type
                    ? show((selectedObject = t.rotLava).element)
                    : "turretRegion" === t.type
                      ? show((selectedObject = t.turret).element)
                      : show((selectedObject = t).element);
            let { x: s, y: n } = t.pos ?? t,
                { x: c, y: o } = t.size ?? { x: 0, y: 0 },
                r = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                i = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
            if ("rotLavaPoint" === t.type) {
                let e = t.rotLava;
                a = (a) => {
                    let c = Math.round((a.pageX - canvas.width / 2) / camScale + camX),
                        o = Math.round((a.pageY - canvas.height / 2) / camScale + camY);
                    (e.inputs.pX.value = t.x = Math.round(c - r + s)),
                        (e.inputs.pY.value = t.y = Math.round(o - i + n));
                };
            } else if ("circularObject" === t.type)
                switch (selectMode) {
                    case "u":
                        a = (e) => {
                            let a = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.inputs.radius.value = t.radius = Math.max(n + o - a, 0) / 2),
                                (t.size.y = t.size.x = 2 * t.radius),
                                (t.inputs.y.value = t.pos.y = n + o - t.size.y),
                                (t.inputs.x.value = t.pos.x = s + o / 2 - t.radius);
                        };
                        break;
                    case "ur":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                c = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.inputs.radius.value = t.radius =
                                Math.min(Math.max(n + o - c, 0), Math.max(a - s, 0)) / 2),
                                (t.size.y = t.size.x = 2 * t.radius),
                                (t.inputs.y.value = t.pos.y = n + o - t.size.y);
                        };
                        break;
                    case "r":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
                            (t.inputs.radius.value = t.radius = Math.max(a - s, 0) / 2),
                                (t.size.y = t.size.x = 2 * t.radius),
                                (t.inputs.y.value = t.pos.y = n + c / 2 - t.radius);
                        };
                        break;
                    case "dr":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                c = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.inputs.radius.value = t.radius = Math.min(Math.max(c - n, 0), Math.max(a - s, 0)) / 2),
                                (t.size.y = t.size.x = 2 * t.radius);
                        };
                        break;
                    case "d":
                        a = (e) => {
                            let a = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.inputs.radius.value = t.radius = Math.max(a - n, 0) / 2),
                                (t.size.y = t.size.x = 2 * t.radius),
                                (t.inputs.x.value = t.pos.x = s + o / 2 - t.radius);
                        };
                        break;
                    case "dl":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                o = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.inputs.radius.value = t.radius =
                                Math.min(Math.max(o - n, 0), Math.max(s + c - a, 0)) / 2),
                                (t.size.y = t.size.x = 2 * t.radius),
                                (t.inputs.x.value = t.pos.x = s + c - t.size.x);
                        };
                        break;
                    case "l":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
                            (t.inputs.radius.value = t.radius = Math.max(s + c - a, 0) / 2),
                                (t.size.y = t.size.x = 2 * t.radius),
                                (t.inputs.y.value = t.pos.y = n + c / 2 - t.radius),
                                (t.inputs.x.value = t.pos.x = s + c - t.size.x);
                        };
                        break;
                    case "ul":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                r = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.inputs.radius.value = t.radius =
                                Math.min(Math.max(n + o - r, 0), Math.max(s + c - a, 0)) / 2),
                                (t.size.y = t.size.x = 2 * t.radius),
                                (t.inputs.x.value = t.pos.x = s + c - t.size.x),
                                (t.inputs.y.value = t.pos.y = n + o - t.size.y);
                        };
                        break;
                    case "m":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                c = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.inputs.x.value = t.pos.x = a - r + s), (t.inputs.y.value = t.pos.y = c - i + n);
                        };
                }
            else if ("turret" === t.type) {
                if ("m" === selectMode) {
                    let e = t.region,
                        { x: c, y: o } = e.pos;
                    a = (a) => {
                        let l = Math.round((a.pageX - canvas.width / 2) / camScale + camX),
                            p = Math.round((a.pageY - canvas.height / 2) / camScale + camY);
                        (t.inputs.x.value = t.pos.x = l - r + s),
                            (t.inputs.y.value = t.pos.y = p - i + n),
                            (t.inputs.rX.value = e.pos.x = l - r + c),
                            (t.inputs.rY.value = e.pos.y = p - i + o);
                    };
                }
            } else if ("turretRegion" === t.type) {
                if ("m" === selectMode) {
                    let { x: e, y: c } = t.pos,
                        o = t.turret;
                    a = (a) => {
                        let l = Math.round((a.pageX - canvas.width / 2) / camScale + camX),
                            p = Math.round((a.pageY - canvas.height / 2) / camScale + camY);
                        (o.inputs.x.value = t.pos.x = l - r + s),
                            (o.inputs.y.value = t.pos.y = p - i + n),
                            (o.inputs.rX.value = t.pos.x = l - r + e),
                            (o.inputs.rY.value = t.pos.y = p - i + c);
                    };
                }
            } else
                switch (selectMode) {
                    case "u":
                        a = (e) => {
                            let a = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            n - a + o > 0
                                ? ((t.pos.y = a), (t.size.y = n - a + o))
                                : ((t.pos.y = n + o), (t.size.y = 0)),
                                (t.inputs.y.value = t.pos.y),
                                (t.inputs.h.value = t.size.y);
                        };
                        break;
                    case "ur":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                c = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.size.x = s - a < 0 ? a - s : 0),
                                n - c + o > 0
                                    ? ((t.pos.y = c), (t.size.y = n - c + o))
                                    : ((t.pos.y = n + o), (t.size.y = 0)),
                                (t.inputs.x.value = t.pos.x),
                                (t.inputs.y.value = t.pos.y),
                                (t.inputs.w.value = t.size.x),
                                (t.inputs.h.value = t.size.y);
                        };
                        break;
                    case "r":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
                            (t.size.x = s - a < 0 ? a - s : 0),
                                (t.inputs.x.value = t.pos.x),
                                (t.inputs.w.value = t.size.x);
                        };
                        break;
                    case "dr":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                c = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.size.x = s - a < 0 ? a - s : 0),
                                (t.size.y = n - c < 0 ? c - n : 0),
                                (t.inputs.x.value = t.pos.x),
                                (t.inputs.y.value = t.pos.y),
                                (t.inputs.w.value = t.size.x),
                                (t.inputs.h.value = t.size.y);
                        };
                        break;
                    case "d":
                        a = (e) => {
                            let a = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.size.y = n - a < 0 ? a - n : 0),
                                (t.inputs.y.value = t.pos.y),
                                (t.inputs.h.value = t.size.y);
                        };
                        break;
                    case "dl":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                o = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            s - a + c > 0
                                ? ((t.pos.x = a), (t.size.x = s - a + c))
                                : ((t.pos.x = s + c), (t.size.x = 0)),
                                (t.size.y = n - o < 0 ? o - n : 0),
                                (t.inputs.x.value = t.pos.x),
                                (t.inputs.y.value = t.pos.y),
                                (t.inputs.w.value = t.size.x),
                                (t.inputs.h.value = t.size.y);
                        };
                        break;
                    case "l":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX);
                            s - a + c > 0
                                ? ((t.pos.x = a), (t.size.x = s - a + c))
                                : ((t.pos.x = s + c), (t.size.x = 0)),
                                (t.inputs.x.value = t.pos.x),
                                (t.inputs.w.value = t.size.x);
                        };
                        break;
                    case "ul":
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                r = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            s - a + c > 0
                                ? ((t.pos.x = a), (t.size.x = s - a + c))
                                : ((t.pos.x = s + c), (t.size.x = 0)),
                                n - r + o > 0
                                    ? ((t.pos.y = r), (t.size.y = n - r + o))
                                    : ((t.pos.y = n + o), (t.size.y = 0)),
                                (t.inputs.x.value = t.pos.x),
                                (t.inputs.y.value = t.pos.y),
                                (t.inputs.w.value = t.size.x),
                                (t.inputs.h.value = t.size.y);
                        };
                        break;
                    case "m":
                        if ("rotatingLava" === t.type) {
                            let { x: e, y: c } = t.point;
                            a = (a) => {
                                let o = Math.round((a.pageX - canvas.width / 2) / camScale + camX),
                                    l = Math.round((a.pageY - canvas.height / 2) / camScale + camY);
                                (t.inputs.x.value = t.pos.x = o - r + s),
                                    (t.inputs.y.value = t.pos.y = l - i + n),
                                    (t.inputs.pX.value = t.point.x = e + o - r),
                                    (t.inputs.pY.value = t.point.y = c + l - i);
                            };
                            break;
                        }
                        a = (e) => {
                            let a = Math.round((e.pageX - canvas.width / 2) / camScale + camX),
                                c = Math.round((e.pageY - canvas.height / 2) / camScale + camY);
                            (t.pos.x = a - r + s),
                                (t.pos.y = c - i + n),
                                (t.inputs.x.value = t.pos.x),
                                (t.inputs.y.value = t.pos.y);
                        };
                }
            (lockCursor = !0),
                canvas.addEventListener("mousemove", (e) => {
                    mousePos = {
                        x: (e.pageX - canvas.width / 2) / camScale + camX,
                        y: (e.pageY - canvas.height / 2) / camScale + camY,
                    };
                }),
                document.addEventListener("mousemove", a),
                document.addEventListener("mouseup", () => {
                    (lockCursor = !1),
                        document.removeEventListener("mousemove", a),
                        (mousePos = {
                            x: (e.pageX - canvas.width / 2) / camScale + camX,
                            y: (e.pageY - canvas.height / 2) / camScale + camY,
                        });
                });
        } else selectedObject && hide(selectedObject.element), (selectedObject = null);
        if (
            e.detail > 1 &&
            selectedObject &&
            "teleporter" === selectedObject.type &&
            selectedObject.targetArea !== currentArea.name
        ) {
            let e = null;
            if ((e = map.areas.find((e) => e.name === selectedObject.targetArea))) {
                hide(currentArea.element), (currentArea = e), selectedObject && hide(selectedObject.element);
                let t = null;
                return (
                    (t = e.objects.teleporter.find((e) => e.id === selectedObject.targetID))
                        ? ((camX = t.pos.x), (camY = t.pos.y), (selectedObject = t))
                        : ((selectedObject = null), (camX = e.size[0] / 2), (camY = e.size[1] / 2)),
                    (timeOnEnter = Date.now()),
                    void show(e.element)
                );
            }
            confirm(`Did not find area ${selectedObject.targetArea}, would you like to create it?`) &&
                (addArea(selectedObject.targetArea), (camX = 50), (camY = 50));
        }
    }),
    canvas.addEventListener("mousemove", (e) => {
        if (!lockCursor) {
            for (let t of types) {
                let a = getObjects(t);
                for (let s = a.length - 1; s >= 0; s--) {
                    let n = a[s],
                        [{ x: c, y: o }, { x: r, y: i }] = points(
                            "rotLavaPoint" === t ? { pos: n, size: { x: 0, y: 0 } } : n
                        ),
                        l = point(e);
                    if ("text" === t) {
                        if (pointInCircle(l, { x: c, y: o }, 5 * camScale + selectBuffer))
                            return (canvas.style.cursor = "grab"), void (selectMode = "m");
                        continue;
                    }
                    if ("turret" === t) {
                        if (pointInCircle(l, { x: c, y: o }, 3 * camScale + selectBuffer))
                            return (canvas.style.cursor = "grab"), void (selectMode = "m");
                        continue;
                    }
                    if ("rotLavaPoint" === t) {
                        if (pointInCircle(l, { x: c, y: o }, 0.5 * camScale + selectBuffer))
                            return (canvas.style.cursor = "grab"), void (selectMode = "m");
                        continue;
                    }
                    let p = pointInRect(
                            l,
                            { x: c - selectBuffer, y: o - selectBuffer },
                            { x: r + selectBuffer, y: i + selectBuffer }
                        ),
                        u = pointInRect(
                            l,
                            { x: c - selectBuffer, y: o - selectBuffer },
                            { x: r + selectBuffer, y: o + selectBuffer }
                        ),
                        d = pointInRect(
                            l,
                            { x: c - selectBuffer, y: o - selectBuffer },
                            { x: c + selectBuffer, y: i + selectBuffer }
                        ),
                        m = pointInRect(
                            l,
                            { x: c - selectBuffer, y: i - selectBuffer },
                            { x: r + selectBuffer, y: i + selectBuffer }
                        ),
                        y = pointInRect(
                            l,
                            { x: r - selectBuffer, y: o - selectBuffer },
                            { x: r + selectBuffer, y: i + selectBuffer }
                        );
                    if (
                        (pointInRect(l, { x: c, y: o }, { x: r, y: i })
                            ? ((canvas.style.cursor = "grab"), (selectMode = "m"))
                            : m
                              ? d
                                  ? ((canvas.style.cursor = "nesw-resize"), (selectMode = "dl"))
                                  : y
                                    ? ((canvas.style.cursor = "nwse-resize"), (selectMode = "dr"))
                                    : ((canvas.style.cursor = "ns-resize"), (selectMode = "d"))
                              : y
                                ? u
                                    ? ((canvas.style.cursor = "nesw-resize"), (selectMode = "ur"))
                                    : m
                                      ? ((canvas.style.cursor = "nwse-resize"), (selectMode = "dr"))
                                      : ((canvas.style.cursor = "ew-resize"), (selectMode = "r"))
                                : u
                                  ? d
                                      ? ((canvas.style.cursor = "nwse-resize"), (selectMode = "ul"))
                                      : y
                                        ? ((canvas.style.cursor = "nesw-resize"), (selectMode = "ur"))
                                        : ((canvas.style.cursor = "ns-resize"), (selectMode = "u"))
                                  : d
                                    ? u
                                        ? ((canvas.style.cursor = "nwse-resize"), (selectMode = "ul"))
                                        : m
                                          ? ((canvas.style.cursor = "nesw-resize"), (selectMode = "dl"))
                                          : ((canvas.style.cursor = "ew-resize"), (selectMode = "l"))
                                    : ((canvas.style.cursor = "initial"), (selectMode = null)),
                        p)
                    )
                        return;
                }
            }
            canvas.style.cursor = "initial";
        }
    }),
    canvas.addEventListener("contextmenu", (e) => {
        e.target !== contextmenu &&
            (e.preventDefault(),
            (contextmenu.style.left = e.x + 1 + "px"),
            (contextmenu.style.top = e.y + 1 + "px"),
            selectedObject ? show(contextBtns.objectActions) : hide(contextBtns.objectActions),
            selectedObject &&
                (contextBtns.deleteObject.innerHTML = `Delete Selected Object<br>(${capitalise(selectedObject.type)})`),
            1 === map.areas.length ? hide(contextBtns.deleteArea) : show(contextBtns.deleteArea),
            show(contextmenu));
    }),
    document.addEventListener("click", (e) => {
        e.target !== contextmenu &&
            (e.target.parentNode !== contextmenu || 2 !== e.button) &&
            (e.target !== canvas || 2 !== e.button) &&
            hide(contextmenu);
    }),
    document.addEventListener("keydown", (e) => {
        e.target instanceof HTMLInputElement ||
            e.key.toLowerCase() !== (localStorage.getItem("hitbox") ?? "o") ||
            (renderSettings.render.hitbox = !renderSettings.render.hitbox);
    }),
    resizemenu.addEventListener("mousedown", () => {
        resizing = !0;
    }),
    document.addEventListener("mouseup", () => {
        resizing = !1;
    }),
    document.addEventListener("mousemove", (e) => {
        resizing && (menu.style.width = Math.max(window.innerWidth - e.pageX - 15, 200) + "px");
    }),
    togglemenu.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    }),
    togglebottommenu.addEventListener("click", () => {
        bottommenu.classList.toggle("hidden");
    }),
    downloadBtn.addEventListener("click", () => {
        map.settings.name || (map.settings.name = prompt("Map name?")),
            null !== map.settings.name &&
                (map.settings.creator || (map.settings.creator = prompt("Map creator's username in skap?")),
                null !== map.settings.creator && download(map.settings.name || "map"));
    }),
    importInput.addEventListener("input", () => {
        importInput.files.length &&
            importInput.files[0]
                .text()
                .then((e) => loadFile(e))
                .catch(console.error);
    }),
    window.addEventListener("beforeunload", (e) => (e.preventDefault(), (e.returnValue = "Have you saved your map?")));
{
    let e = document.createElement("input");
    (e.value = map.settings.name),
        e.addEventListener("input", () => {
            map.settings.name = e.value;
        });
    let t = document.createElement("input");
    (t.value = map.settings.creator),
        t.addEventListener("input", () => {
            map.settings.creator = t.value;
        });
    let a = document.createElement("input");
    (a.value = map.settings.spawnArea),
        a.addEventListener("change", () => {
            map.areas.some((e) => e.name === a.value)
                ? (map.settings.spawnArea = a.value)
                : confirm(`Area ${a.value} not found, would you like to create it?`)
                  ? addArea(a.value)
                  : alert("You'd better make that area then.");
        });
    let s = document.createElement("input");
    (s.value = map.settings.spawnPos[0]),
        s.addEventListener("input", () => {
            map.settings.spawnPos[0] = Number(s.value);
        });
    let n = document.createElement("input");
    (n.value = map.settings.spawnPos[1]),
        n.addEventListener("input", () => {
            map.settings.spawnPos[1] = Number(n.value);
        }),
        (map.element = createFolder("Map Properties", [
            createProperty("name", e, "text"),
            createProperty("creator", t, "text"),
            createProperty("spawnArea", a, "text"),
            createFolder("Spawn Position", [createProperty("x", s, "number"), createProperty("y", n, "number")]),
        ])),
        map.element.classList.add("closed"),
        menu.insertBefore(map.element, areamenu),
        (map.inputs = { name: e, creator: t, spawnArea: a, spawnX: s, spawnY: n });
}
obstacleBtn.addEventListener("click", addObstacle),
    lavaBtn.addEventListener("click", addLava),
    slimeBtn.addEventListener("click", addSlime),
    iceBtn.addEventListener("click", addIce),
    contextBtns.obstacle.addEventListener("click", addObstacle),
    contextBtns.lava.addEventListener("click", addLava),
    contextBtns.slime.addEventListener("click", addSlime),
    contextBtns.ice.addEventListener("click", addIce),
    contextBtns.block.addEventListener("click", addBlock),
    contextBtns.teleporter.addEventListener("click", addTeleporter),
    contextBtns.text.addEventListener("click", addText),
    contextBtns.spawner.addEventListener("click", addSpawner),
    contextBtns.gravZone.addEventListener("click", addGravZone),
    contextBtns.rotLava.addEventListener("click", addRotatingLava),
    contextBtns.cirObj.addEventListener("click", addCircularObject),
    contextBtns.door.addEventListener("click", addDoor),
    contextBtns.switch.addEventListener("click", addSwitch),
    contextBtns.button.addEventListener("click", addButton),
    contextBtns.turret.addEventListener("click", addTurret),
    contextBtns.movObj.addEventListener("click", addMovingObject),
    contextBtns.area.addEventListener("click", () => addArea()),
    contextBtns.resetTime.addEventListener("click", () => (timeOnEnter = Date.now())),
    contextBtns.deleteObject.addEventListener("click", () => {
        if (selectedObject) {
            let e = currentArea.objects[selectedObject.type];
            e.includes(selectedObject) &&
                (e.splice(e.indexOf(selectedObject), 1), selectedObject.element.remove(), (selectedObject = null));
        }
    }),
    contextBtns.deleteArea.addEventListener("click", () => {
        if (currentArea && 1 !== map.areas.length && confirm("Are you sure you want to delete this area?")) {
            let e = map.areas;
            e.includes(currentArea) &&
                (e.splice(e.indexOf(currentArea), 1),
                currentArea.element.remove(),
                currentArea.button.remove(),
                show((currentArea = e[0]).element));
        }
    });
const copyBtn = document.createElement("button");
function points(e) {
    return e.pos && e.size
        ? [
              {
                  x: Math.round(canvas.width / 2 + camScale * (e.pos.x - camX)),
                  y: Math.round(canvas.height / 2 + camScale * (e.pos.y - camY)),
              },
              {
                  x: Math.round(canvas.width / 2 + camScale * (e.pos.x + e.size.x - camX)),
                  y: Math.round(canvas.height / 2 + camScale * (e.pos.y + e.size.y - camY)),
              },
          ]
        : [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
          ];
}
function point(e) {
    return { x: e.pageX, y: e.pageY };
}
function pointInRect(e, t, a) {
    return e.x > t.x && e.x < a.x && e.y > t.y && e.y < a.y;
}
function pointInCircle(e, t, a) {
    return (e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y) <= a * a;
}
function hide(e) {
    e?.classList && e.classList.add("hidden");
}
function show(e) {
    e?.classList && e.classList.remove("hidden");
}
function capitalise(e = "") {
    return (e = String(e)).length <= 1 ? e : e[0].toUpperCase() + e.slice(1);
}
function pasteClipboard() {
    if (!clipboard || !currentArea) return;
    const e = (mousePos?.x ?? 0) * camScale + canvas.width / 2,
        t = (mousePos?.y ?? 0) * camScale + canvas.height / 2,
        a = (e - canvas.width / 2) / camScale + camX,
        s = (t - canvas.height / 2) / camScale + camY;
    let n = cloneObject(clipboard);
    if (!n) return;
    const c = {
        obstacle: () => createObstacle(n.pos.x, n.pos.y, n.size.x, n.size.y),
        lava: () => createLava(n.pos.x, n.pos.y, n.size.x, n.size.y),
        slime: () => createSlime(n.pos.x, n.pos.y, n.size.x, n.size.y),
        ice: () => createIce(n.pos.x, n.pos.y, n.size.x, n.size.y),
        block: () => createBlock(n.pos.x, n.pos.y, n.size.x, n.size.y, n.color, n.opacity, n.collide, n.layer),
        teleporter: () => createTeleporter(n.pos.x, n.pos.y, n.size.x, n.size.y, n.dir, n.id, n.targetArea, n.targetId),
        text: () => createText(n.pos.x, n.pos.y, n.text),
        spawner: () => createSpawner(n.pos.x, n.pos.y, n.size.x, n.size.y, n.enemyType, n.number, n.speed, n.radius),
        gravityZone: () => createGravZone(n.pos.x, n.pos.y, n.size.x, n.size.y, n.dir),
        rotatingLava: () =>
            createRotatingLava(n.pos.x, n.pos.y, n.size.x, n.size.y, n.point.x, n.point.y, n.startAngle, n.speed),
        circularObject: () => createCircularObject(n.pos.x, n.pos.y, n.radius, n.objectType),
        door: () => createDoor(n.pos.x, n.pos.y, n.size.x, n.size.y, n.linkIds),
        switch: () => createSwitch(n.pos.x, n.pos.y, n.size.x, n.size.y, n.dir, n.id),
        button: () => createButton(n.pos.x, n.pos.y, n.size.x, n.size.y, n.dir, n.id, n.time),
        turret: () =>
            createTurret(
                n.pos.x,
                n.pos.y,
                n.region.pos.x,
                n.region.pos.y,
                n.region.size.x,
                n.region.size.y,
                n.radius,
                n.speed,
                n.shootingSpeed,
                n.overHeat,
                n.coolDownTime
            ),
        movingObject: () => createMovingObject(n.size.x, n.size.y, n.objectType, n.points),
        hatReward: () => createHatReward(n.pos.x, n.pos.y, n.reward),
    };
    if (!c[n.type]) return alert("broken idk contact @yeahdill " + n.type);
    const o = n.pos ?? n,
        r = o.x,
        i = o.y;
    let l = c[n.type](),
        p = n.type;
    const u = a - r,
        d = s - i;
    l.pos ? ((l.pos.x = a), (l.pos.y = s)) : void 0 !== l.x && ((l.x = a), (l.y = s)),
        l.inputs?.x && (l.inputs.x.value = a),
        l.inputs?.y && (l.inputs.y.value = s),
        "rotatingLava" === l.type &&
            l.point &&
            ((l.point.x = n.point.x + u),
            (l.point.y = n.point.y + d),
            l.inputs?.pX && (l.inputs.pX.value = l.point.x),
            l.inputs?.pY && (l.inputs.pY.value = l.point.y)),
        currentArea.objects[p].push(l),
        objectmenu.appendChild(l.element),
        selectedObject?.element && hide(selectedObject.element),
        show(l.element),
        (selectedObject = l);
}
(copyBtn.id = "copyObject"),
    (copyBtn.textContent = "Copy Object"),
    contextmenu.appendChild(copyBtn),
    (contextBtns.copyObject = copyBtn),
    contextBtns.copyObject.addEventListener("click", () => {
        selectedObject && ((clipboard = cloneObject(selectedObject)), hide(contextmenu));
    }),
    contextBtns.copyObject.addEventListener("click", () => {
        if (!selectedObject) return;
        let e = cloneObject(selectedObject);
        e && ((clipboard = e), hide(contextmenu));
    }),
    addArea("Home"),
    (function e() {
        render(), window.requestAnimationFrame(e);
    })(),
    document.addEventListener("keydown", (e) => {
        e.target instanceof HTMLInputElement ||
            (e.ctrlKey &&
                "c" === e.key.toLowerCase() &&
                selectedObject &&
                ((clipboard = cloneObject(selectedObject)), e.preventDefault()),
            e.ctrlKey &&
                "v" === e.key.toLowerCase() &&
                clipboard &&
                currentArea &&
                (pasteClipboard(), e.preventDefault()));
    }),
    (() => {
        let e = !1,
            t = null,
            a = null,
            s = [],
            n = new Map(),
            c = null,
            o = !1;
        const r = {
                obstacle: (e) => createObstacle(e.pos.x, e.pos.y, e.size.x, e.size.y),
                lava: (e) => createLava(e.pos.x, e.pos.y, e.size.x, e.size.y),
                slime: (e) => createSlime(e.pos.x, e.pos.y, e.size.x, e.size.y),
                ice: (e) => createIce(e.pos.x, e.pos.y, e.size.x, e.size.y),
                block: (e) => createBlock(e.pos.x, e.pos.y, e.size.x, e.size.y, e.color, e.opacity, e.collide, e.layer),
                teleporter: (e) =>
                    createTeleporter(e.pos.x, e.pos.y, e.size.x, e.size.y, e.dir, e.id, e.targetArea, e.targetId),
                text: (e) => createText(e.pos.x, e.pos.y, e.text),
                spawner: (e) =>
                    createSpawner(e.pos.x, e.pos.y, e.size.x, e.size.y, e.enemyType, e.number, e.speed, e.radius),
                gravityZone: (e) => createGravZone(e.pos.x, e.pos.y, e.size.x, e.size.y, e.dir),
                rotatingLava: (e) =>
                    createRotatingLava(
                        e.pos.x,
                        e.pos.y,
                        e.size.x,
                        e.size.y,
                        e.point.x,
                        e.point.y,
                        e.startAngle,
                        e.speed
                    ),
                circularObject: (e) => createCircularObject(e.pos.x, e.pos.y, e.radius, e.objectType),
                door: (e) => createDoor(e.pos.x, e.pos.y, e.size.x, e.size.y, e.linkIds),
                switch: (e) => createSwitch(e.pos.x, e.pos.y, e.size.x, e.size.y, e.dir, e.id),
                button: (e) => createButton(e.pos.x, e.pos.y, e.size.x, e.size.y, e.dir, e.id, e.time),
                turret: (e) =>
                    createTurret(
                        e.pos.x,
                        e.pos.y,
                        e.region.pos.x,
                        e.region.pos.y,
                        e.region.size.x,
                        e.region.size.y,
                        e.radius,
                        e.speed,
                        e.shootingSpeed,
                        e.overHeat,
                        e.coolDownTime
                    ),
                movingObject: (e) => createMovingObject(e.size.x, e.size.y, e.objectType, e.points),
                hatReward: (e) => createHatReward(e.pos.x, e.pos.y, e.reward),
            },
            i = (e, t) => ({
                x: (e - canvas.width / 2) / camScale + camX,
                y: (t - canvas.height / 2) / camScale + camY,
            }),
            l = (e, t) => ({
                x: canvas.width / 2 + camScale * (e - camX),
                y: canvas.height / 2 + camScale * (t - camY),
            }),
            p = (e) => 10 * Math.round(e / 10),
            u = (e) => {
                e?.classList && e.classList.add("hidden");
            },
            d = (e) => {
                e?.classList && e.classList.remove("hidden");
            };
        canvas.addEventListener("mousedown", (o) => {
            if (0 !== o.button || lockCursor) return;
            const r = i(o.pageX, o.pageY),
                l = targetedObject(o);
            if (l && s.includes(l)) {
                (c = r),
                    s.forEach((e) => {
                        const t = e.pos ?? e;
                        n.set(e, { x: t.x, y: t.y });
                    });
                const e = (e) => {
                        const t = i(e.pageX, e.pageY),
                            a = t.x - c.x,
                            o = t.y - c.y;
                        s.forEach((e) => {
                            const t = n.get(e),
                                s = t.x + a,
                                c = t.y + o;
                            e.pos ? ((e.pos.x = s), (e.pos.y = c)) : void 0 !== e.x && ((e.x = s), (e.y = c)),
                                e.inputs?.x && (e.inputs.x.value = s),
                                e.inputs?.y && (e.inputs.y.value = c),
                                "rotatingLava" === e.type &&
                                    e.point &&
                                    ((e.point.x += a),
                                    (e.point.y += o),
                                    e.inputs?.pX && (e.inputs.pX.value = e.point.x),
                                    e.inputs?.pY && (e.inputs.pY.value = e.point.y)),
                                "turret" === e.type &&
                                    e.region &&
                                    ((e.region.pos.x += a),
                                    (e.region.pos.y += o),
                                    e.inputs?.rX && (e.inputs.rX.value = e.region.pos.x),
                                    e.inputs?.rY && (e.inputs.rY.value = e.region.pos.y)),
                                "turretRegion" === e.type &&
                                    e.turret &&
                                    ((e.turret.pos.x += a),
                                    (e.turret.pos.y += o),
                                    e.turret.inputs?.x && (e.turret.inputs.x.value = e.turret.pos.x),
                                    e.turret.inputs?.y && (e.turret.inputs.y.value = e.turret.pos.y)),
                                "rotLavaPoint" === e.type &&
                                    e.rotLava &&
                                    ((e.rotLava.pos.x += a),
                                    (e.rotLava.pos.y += o),
                                    e.rotLava.inputs?.x && (e.rotLava.inputs.x.value = e.rotLava.pos.x),
                                    e.rotLava.inputs?.y && (e.rotLava.inputs.y.value = e.rotLava.pos.y));
                        });
                    },
                    t = () => {
                        document.removeEventListener("mousemove", e),
                            document.removeEventListener("mouseup", t),
                            (lockCursor = !1),
                            n.clear(),
                            (c = null);
                    };
                return (
                    (lockCursor = !0),
                    document.addEventListener("mousemove", e),
                    void document.addEventListener("mouseup", t)
                );
            }
            l ||
                ((t = r),
                (a = r),
                (e = !0),
                selectedObject?.element && u(selectedObject.element),
                (selectedObject = null));
        }),
            canvas.addEventListener("mousemove", (t) => {
                e && (a = i(t.pageX, t.pageY));
            }),
            document.addEventListener("mouseup", (n) => {
                if (!e) return;
                e = !1;
                const c = {
                    left: Math.min(t.x, a.x),
                    top: Math.min(t.y, a.y),
                    right: Math.max(t.x, a.x),
                    bottom: Math.max(t.y, a.y),
                };
                s = ((e) => {
                    const t = [];
                    for (const a of types) {
                        const s = getObjects(a);
                        for (const a of s) {
                            const s = a.pos ?? a,
                                n = a.size ?? { x: 0, y: 0 },
                                c = s.x,
                                o = s.x + n.x,
                                r = s.y,
                                i = s.y + n.y;
                            o >= e.left && c <= e.right && i >= e.top && r <= e.bottom && t.push(a);
                        }
                    }
                    return t;
                })(c);
                for (const e of types) getObjects(e).forEach((e) => u(e.element));
                s.forEach((e) => {
                    e.element && d(e.element);
                }),
                    (selectedObject = 1 === s.length ? s[0] : null),
                    (t = a = null);
            });
        const m = render;
        if (
            ((render = function () {
                m();
                const n = canvas.getContext("2d");
                ((e) => {
                    if (!o) return;
                    const t = 10,
                        a = Math.floor((camX - canvas.width / (2 * camScale)) / t) * t,
                        s = Math.ceil((camX + canvas.width / (2 * camScale)) / t) * t,
                        n = Math.floor((camY - canvas.height / (2 * camScale)) / t) * t,
                        c = Math.ceil((camY + canvas.height / (2 * camScale)) / t) * t;
                    e.save(), (e.strokeStyle = "rgba(100, 100, 100, 0.3)"), (e.lineWidth = 1);
                    for (let n = a; n <= s; n += t) {
                        const t = l(n, 0).x;
                        e.beginPath(), e.moveTo(t, 0), e.lineTo(t, canvas.height), e.stroke();
                    }
                    for (let a = n; a <= c; a += t) {
                        const t = l(0, a).y;
                        e.beginPath(), e.moveTo(0, t), e.lineTo(canvas.width, t), e.stroke();
                    }
                    e.restore();
                })(n),
                    ((s) => {
                        if (!e || !t || !a) return;
                        const n = Math.min(t.x, a.x),
                            c = Math.min(t.y, a.y),
                            o = Math.max(t.x, a.x),
                            r = Math.max(t.y, a.y),
                            i = l(n, c),
                            p = camScale * (o - n),
                            u = camScale * (r - c);
                        s.save(),
                            (s.strokeStyle = "rgba(0,180,255,0.9)"),
                            (s.lineWidth = 2),
                            s.setLineDash([6, 4]),
                            s.strokeRect(i.x, i.y, p, u),
                            s.restore();
                    })(n),
                    s.forEach((e) => {
                        const [{ x: t, y: a }, { x: s, y: c }] = points(
                                "rotLavaPoint" === e.type ? { pos: e, size: { x: 0, y: 0 } } : e
                            ),
                            o = Math.min(t, s) - 3,
                            r = Math.min(a, c) - 3,
                            i = Math.abs(s - t) + 6,
                            l = Math.abs(c - a) + 6;
                        n.save(),
                            (n.strokeStyle = "rgba(0,180,255,0.7)"),
                            (n.lineWidth = 2),
                            n.setLineDash([4, 4]),
                            n.strokeRect(o, r, i, l),
                            n.restore();
                    });
            }),
            document.addEventListener("keydown", (e) => {
                if (!(e.target instanceof HTMLInputElement)) {
                    if (e.ctrlKey && "c" === e.key.toLowerCase())
                        return (
                            s.length
                                ? (clipboard = s.map((e) => cloneObject(e)))
                                : selectedObject && (clipboard = cloneObject(selectedObject)),
                            void e.preventDefault()
                        );
                    if (e.ctrlKey && "v" === e.key.toLowerCase() && clipboard && currentArea) {
                        const t = (e) => {
                                const t = cloneObject(e),
                                    a = r[t.type];
                                if (!a) return null;
                                const s = a(t);
                                return (
                                    currentArea.objects[t.type].push(s),
                                    objectmenu.appendChild(s.element),
                                    u(s.element),
                                    s
                                );
                            },
                            a = [],
                            n = (() => {
                                const e = mousePos?.x ?? 0,
                                    t = mousePos?.y ?? 0;
                                return i(e * camScale + canvas.width / 2, t * camScale + canvas.height / 2);
                            })(),
                            c = p(n.x),
                            o = p(n.y);
                        if (Array.isArray(clipboard)) {
                            const e = clipboard[0],
                                s = e.pos ?? e,
                                n = p(s.x),
                                r = p(s.y);
                            clipboard.forEach((e) => {
                                const s = t(e);
                                if (!s) return;
                                const i = e.pos ?? e,
                                    l = p(i.x) - n,
                                    u = p(i.y) - r,
                                    d = c + l,
                                    m = o + u;
                                s.pos ? ((s.pos.x = d), (s.pos.y = m)) : void 0 !== s.x && ((s.x = d), (s.y = m)),
                                    s.inputs?.x && (s.inputs.x.value = d),
                                    s.inputs?.y && (s.inputs.y.value = m),
                                    "rotatingLava" === s.type &&
                                        s.point &&
                                        ((s.point.x = p(e.point.x) - n + c),
                                        (s.point.y = p(e.point.y) - r + o),
                                        s.inputs?.pX && (s.inputs.pX.value = s.point.x),
                                        s.inputs?.pY && (s.inputs.pY.value = s.point.y)),
                                    "turret" === s.type &&
                                        s.region &&
                                        ((s.region.pos.x = p(e.region.pos.x) - n + c),
                                        (s.region.pos.y = p(e.region.pos.y) - r + o),
                                        s.inputs?.rX && (s.inputs.rX.value = s.region.pos.x),
                                        s.inputs?.rY && (s.inputs.rY.value = s.region.pos.y)),
                                    a.push(s);
                            });
                        } else {
                            const e = t(clipboard);
                            e &&
                                ((e.pos.x = c),
                                (e.pos.y = o),
                                e.inputs?.x && (e.inputs.x.value = c),
                                e.inputs?.y && (e.inputs.y.value = o),
                                a.push(e));
                        }
                        s = a;
                        for (const e of types) getObjects(e).forEach((e) => u(e.element));
                        a.forEach((e) => {
                            e.element && d(e.element);
                        }),
                            (selectedObject = 1 === a.length ? a[0] : null),
                            e.preventDefault();
                    }
                    if ("Backspace" === e.key || "Delete" === e.key) {
                        if (!s.length) return;
                        s.forEach((e) => {
                            const t = currentArea.objects[e.type],
                                a = t.indexOf(e);
                            -1 !== a && t.splice(a, 1), e.element && e.element.remove();
                        }),
                            (s = []),
                            (selectedObject = null),
                            e.preventDefault();
                    }
                    "g" === e.key.toLowerCase() && ((o = !o), e.preventDefault());
                }
            }),
            contextBtns.copyObject)
        ) {
            const e = contextBtns.copyObject.textContent;
            contextBtns.copyObject.addEventListener("click", () => {
                s.length
                    ? (clipboard = s.map((e) => cloneObject(e)))
                    : selectedObject && (clipboard = cloneObject(selectedObject)),
                    hide(contextmenu);
            }),
                setInterval(() => {
                    contextBtns.copyObject.textContent = s.length > 1 ? `Copy Selected (${s.length})` : e;
                }, 150);
        }
        const y = window.addArea || (() => {});
        window.addArea = function (e) {
            const t = y(e);
            return (s = []), selectedObject?.element && u(selectedObject.element), (selectedObject = null), t;
        };
    })();
