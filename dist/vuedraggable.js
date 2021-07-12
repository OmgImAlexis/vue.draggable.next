"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/vuedraggable.ts
var _sortablejs = require('sortablejs'); var _sortablejs2 = _interopRequireDefault(_sortablejs);

// src/util/htmlHelper.ts
function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}
function insertNodeAt(fatherNode, node, position) {
  const refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}

// src/util/console.ts
function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }
  return global.console;
}
var console = getConsole();

// src/util/string.ts
function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var regex = /-(\w)/g;
var camelize = cached((str) => str.replace(regex, (_, c) => c.toUpperCase()));

// src/core/sortableEvents.ts
var manageAndEmit = ["Start", "Add", "Remove", "Update", "End"];
var emit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
var manage = ["Move"];
var eventHandlerNames = [manage, manageAndEmit, emit].flatMap((events2) => events2).map((evt) => `on${evt}`);
var events = {
  manage,
  manageAndEmit,
  emit
};
function isReadOnly(eventName) {
  return eventHandlerNames.indexOf(eventName) !== -1;
}

// src/util/tags.ts
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
];
function isHtmlTag(name) {
  return tags.includes(name);
}
function isTransition(name) {
  return ["transition-group", "TransitionGroup"].includes(name);
}
function isHtmlAttribute(value) {
  return ["id", "class", "role", "style"].includes(value) || value.startsWith("data-") || value.startsWith("aria-");
}

// src/core/componentBuilderHelper.ts
function project(entries) {
  return entries.reduce((res, [key, value]) => {
    res[key] = value;
    return res;
  }, {});
}
function getComponentAttributes({ $attrs, componentData = {} }) {
  const attributes = project(Object.entries($attrs).filter(([key, _]) => isHtmlAttribute(key)));
  return __spreadValues(__spreadValues({}, attributes), componentData);
}
function createSortableOption({ $attrs, callBackBuilder }) {
  const options = project(getValidSortableEntries($attrs));
  Object.entries(callBackBuilder).forEach(([eventType, eventBuilder]) => {
    events[eventType].forEach((event) => {
      options[`on${event}`] = eventBuilder(event);
    });
  });
  const draggable = `[data-draggable]${options.draggable || ""}`;
  return __spreadProps(__spreadValues({}, options), {
    draggable
  });
}
function getValidSortableEntries(value) {
  return Object.entries(value).filter(([key, _]) => !isHtmlAttribute(key)).map(([key, value2]) => [camelize(key), value2]).filter(([key, _]) => !isReadOnly(key));
}

// src/core/componentStructure.ts
var getHtmlElementFromNode = ({ el }) => el;
var addContext = (domElement, context) => domElement.__draggable_context = context;
var getContext = (domElement) => domElement.__draggable_context;
var ComponentStructure = class {
  constructor({
    nodes: { header, default: defaultNodes, footer },
    root,
    realList
  }) {
    this.defaultNodes = defaultNodes;
    this.children = [...header, ...defaultNodes, ...footer];
    this.externalComponent = root.externalComponent;
    this.rootTransition = root.transition;
    this.tag = root.tag;
    this.realList = realList;
  }
  get _isRootComponent() {
    return this.externalComponent || this.rootTransition;
  }
  render(h2, attributes) {
    const { tag, children, _isRootComponent } = this;
    const option = !_isRootComponent ? children : { default: () => children };
    return h2(tag, attributes, option);
  }
  updated() {
    const { defaultNodes, realList } = this;
    defaultNodes.forEach((node, index) => {
      addContext(getHtmlElementFromNode(node), {
        element: realList[index],
        index
      });
    });
  }
  getUnderlyingVm(domElement) {
    return getContext(domElement);
  }
  getVmIndexFromDomIndex(domIndex, element) {
    const { defaultNodes } = this;
    const { length } = defaultNodes;
    const domChildren = element.children;
    const domElement = domChildren.item(domIndex);
    if (domElement === null) {
      return length;
    }
    const context = getContext(domElement);
    if (context) {
      return context.index;
    }
    if (length === 0) {
      return 0;
    }
    const firstDomListElement = getHtmlElementFromNode(defaultNodes[0]);
    const indexFirstDomListElement = [...domChildren].findIndex((element2) => element2 === firstDomListElement);
    return domIndex < indexFirstDomListElement ? 0 : length;
  }
};

// src/core/renderHelper.ts
var _vue = require('vue');
function getSlot(slots, key) {
  const slotValue = slots[key];
  return slotValue ? slotValue() : [];
}
function computeNodes({ $slots, realList, getKey }) {
  const normalizedList = realList || [];
  const [header, footer] = ["header", "footer"].map((name) => getSlot($slots, name));
  const { item } = $slots;
  if (!item) {
    throw new Error("draggable element must have an item slot");
  }
  const defaultNodes = normalizedList.flatMap((element, index) => item({ element, index }).map((node) => {
    node.key = getKey(element);
    node.props = __spreadProps(__spreadValues({}, node.props || {}), { "data-draggable": true });
    return node;
  }));
  if (defaultNodes.length !== normalizedList.length) {
    throw new Error("Item slot must have only one child");
  }
  return {
    header,
    footer,
    default: defaultNodes
  };
}
function getRootInformation(tag) {
  const transition = isTransition(tag);
  const externalComponent = !isHtmlTag(tag) && !transition;
  return {
    transition,
    externalComponent,
    tag: externalComponent ? _vue.resolveComponent.call(void 0, tag) : transition ? _vue.TransitionGroup : tag
  };
}
function computeComponentStructure({ $slots, tag, realList, getKey }) {
  const nodes = computeNodes({ $slots, realList, getKey });
  const root = getRootInformation(tag);
  return new ComponentStructure({ nodes, root, realList });
}

// src/vuedraggable.ts

function emit2(evtName, evtData) {
  _vue.nextTick.call(void 0, () => this.$emit(evtName.toLowerCase(), evtData));
}
function manage2(evtName) {
  return (evtData, originalElement) => {
    if (this.realList !== null) {
      return this[`onDrag${evtName}`](evtData, originalElement);
    }
  };
}
function manageAndEmit2(evtName) {
  const delegateCallBack = manage2.call(this, evtName);
  return (evtData, originalElement) => {
    delegateCallBack.call(this, evtData, originalElement);
    emit2.call(this, evtName, evtData);
  };
}
var draggingElement = null;
var props = {
  list: {
    type: Array,
    required: false,
    default: null
  },
  modelValue: {
    type: Array,
    required: false,
    default: null
  },
  itemKey: {
    type: [String, Function],
    required: true
  },
  clone: {
    type: Function,
    default: (original) => {
      return original;
    }
  },
  tag: {
    type: String,
    default: "div"
  },
  move: {
    type: Function,
    default: null
  },
  componentData: {
    type: Object,
    required: false,
    default: null
  }
};
var emits = [
  "update:modelValue",
  "change",
  ...[...events.manageAndEmit, ...events.emit].map((evt) => evt.toLowerCase())
];
var draggableComponent = _vue.defineComponent.call(void 0, {
  name: "draggable",
  inheritAttrs: false,
  props,
  emits,
  data() {
    return {
      error: false
    };
  },
  render() {
    try {
      this.error = false;
      const { $slots, $attrs, tag, componentData, realList, getKey } = this;
      const componentStructure = computeComponentStructure({
        $slots,
        tag,
        realList,
        getKey
      });
      this.componentStructure = componentStructure;
      const attributes = getComponentAttributes({ $attrs, componentData });
      return componentStructure.render(_vue.h, attributes);
    } catch (err) {
      this.error = true;
      return _vue.h.call(void 0, "pre", { style: { color: "red" } }, err.stack);
    }
  },
  created() {
    if (this.list !== null && this.modelValue !== null) {
      console.error("modelValue and list props are mutually exclusive! Please set one or another.");
    }
  },
  mounted() {
    if (this.error) {
      return;
    }
    const { $attrs, $el, componentStructure } = this;
    componentStructure.updated();
    const sortableOptions = createSortableOption({
      $attrs,
      callBackBuilder: {
        manageAndEmit: (event) => manageAndEmit2.call(this, event),
        emit: (event) => emit2.bind(this, event),
        manage: (event) => manage2.call(this, event)
      }
    });
    const targetDomElement = $el.nodeType === 1 ? $el : $el.parentElement;
    this._sortable = new (0, _sortablejs2.default)(targetDomElement, sortableOptions);
    this.targetDomElement = targetDomElement;
    targetDomElement.__draggable_component__ = this;
  },
  updated() {
    this.componentStructure.updated();
  },
  beforeUnmount() {
    if (this._sortable !== void 0)
      this._sortable.destroy();
  },
  computed: {
    realList() {
      const { list } = this;
      return list ? list : this.modelValue;
    },
    getKey() {
      const { itemKey } = this;
      if (typeof itemKey === "function") {
        return itemKey;
      }
      return (element) => element[itemKey];
    }
  },
  watch: {
    $attrs: {
      handler(newOptionValue) {
        const { _sortable } = this;
        if (!_sortable)
          return;
        getValidSortableEntries(newOptionValue).forEach(([key, value]) => {
          _sortable.option(key, value);
        });
      },
      deep: true
    }
  },
  methods: {
    getUnderlyingVm(domElement) {
      return this.componentStructure.getUnderlyingVm(domElement) || null;
    },
    getUnderlyingPotencialDraggableComponent(htmElement) {
      return htmElement.__draggable_component__;
    },
    emitChanges(evt) {
      _vue.nextTick.call(void 0, () => this.$emit("change", evt));
    },
    alterList(onList) {
      if (this.list) {
        onList(this.list);
        return;
      }
      const newList = [...this.modelValue];
      onList(newList);
      this.$emit("update:modelValue", newList);
    },
    spliceList() {
      const spliceList = (list) => list.splice(...arguments);
      this.alterList(spliceList);
    },
    updatePosition(oldIndex, newIndex) {
      const updatePosition = (list) => list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      this.alterList(updatePosition);
    },
    getRelatedContextFromMoveEvent({ to, related }) {
      const component = this.getUnderlyingPotencialDraggableComponent(to);
      if (!component) {
        return { component };
      }
      const list = component.realList;
      const context = { list, component };
      if (to !== related && list) {
        const destination = component.getUnderlyingVm(related) || {};
        return __spreadValues(__spreadValues({}, destination), context);
      }
      return context;
    },
    getVmIndexFromDomIndex(domIndex) {
      return this.componentStructure.getVmIndexFromDomIndex(domIndex, this.targetDomElement);
    },
    onDragStart(evt) {
      this.context = this.getUnderlyingVm(evt.item);
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
    },
    onDragAdd(evt) {
      const element = evt.item._underlying_vm_;
      if (element === void 0) {
        return;
      }
      removeNode(evt.item);
      const newIndex = this.getVmIndexFromDomIndex(evt.newIndex);
      this.spliceList(newIndex, 0, element);
      const added = { element, newIndex };
      this.emitChanges({ added });
    },
    onDragRemove(evt) {
      insertNodeAt(this.$el, evt.item, evt.oldIndex);
      if (evt.pullMode === "clone") {
        removeNode(evt.clone);
        return;
      }
      const { index: oldIndex, element } = this.context;
      this.spliceList(oldIndex, 1);
      const removed = { element, oldIndex };
      this.emitChanges({ removed });
    },
    onDragUpdate(evt) {
      removeNode(evt.item);
      insertNodeAt(evt.from, evt.item, evt.oldIndex);
      const oldIndex = this.context.index;
      const newIndex = this.getVmIndexFromDomIndex(evt.newIndex);
      this.updatePosition(oldIndex, newIndex);
      const moved = { element: this.context.element, oldIndex, newIndex };
      this.emitChanges({ moved });
    },
    computeFutureIndex(relatedContext, evt) {
      if (!relatedContext.element) {
        return 0;
      }
      const domChildren = [...evt.to.children].filter((el) => el.style["display"] !== "none");
      const currentDomIndex = domChildren.indexOf(evt.related);
      const currentIndex = relatedContext.component.getVmIndexFromDomIndex(currentDomIndex);
      const draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
    },
    onDragMove(evt, originalEvent) {
      const { move, realList } = this;
      if (!move || !realList) {
        return true;
      }
      const relatedContext = this.getRelatedContextFromMoveEvent(evt);
      const futureIndex = this.computeFutureIndex(relatedContext, evt);
      const draggedContext = __spreadProps(__spreadValues({}, this.context), {
        futureIndex
      });
      const sendEvent = __spreadProps(__spreadValues({}, evt), {
        relatedContext,
        draggedContext
      });
      return move(sendEvent, originalEvent);
    },
    onDragEnd() {
      draggingElement = null;
    }
  }
});


exports.draggableComponent = draggableComponent;
