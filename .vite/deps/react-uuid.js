import {
  __commonJS
} from "./chunk-EQCVQC35.js";

// node_modules/react-uuid/uuid.js
var require_uuid = __commonJS({
  "node_modules/react-uuid/uuid.js"(exports, module) {
    function uuid() {
      const hashTable = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ];
      let uuid2 = [];
      for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
          uuid2[i] = "-";
        } else {
          uuid2[i] = hashTable[Math.ceil(Math.random() * hashTable.length - 1)];
        }
      }
      return uuid2.join("");
    }
    module.exports = uuid;
  }
});
export default require_uuid();
//# sourceMappingURL=react-uuid.js.map
