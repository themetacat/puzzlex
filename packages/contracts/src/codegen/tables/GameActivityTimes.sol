// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { FieldLayout } from "@latticexyz/store/src/FieldLayout.sol";
import { Schema } from "@latticexyz/store/src/Schema.sol";
import { EncodedLengths, EncodedLengthsLib } from "@latticexyz/store/src/EncodedLengths.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";

library GameActivityTimes {
  // Hex below is the result of `WorldResourceIdLib.encode({ namespace: "", name: "GameActivityTime", typeId: RESOURCE_TABLE });`
  ResourceId constant _tableId = ResourceId.wrap(0x7462000000000000000000000000000047616d65416374697669747954696d65);

  FieldLayout constant _fieldLayout =
    FieldLayout.wrap(0x0020010020000000000000000000000000000000000000000000000000000000);

  // Hex-encoded key schema of (address, uint256, uint256)
  Schema constant _keySchema = Schema.wrap(0x00540300611f1f00000000000000000000000000000000000000000000000000);
  // Hex-encoded value schema of (uint256)
  Schema constant _valueSchema = Schema.wrap(0x002001001f000000000000000000000000000000000000000000000000000000);

  /**
   * @notice Get the table's key field names.
   * @return keyNames An array of strings with the names of key fields.
   */
  function getKeyNames() internal pure returns (string[] memory keyNames) {
    keyNames = new string[](3);
    keyNames[0] = "tokenAddr";
    keyNames[1] = "tokenId";
    keyNames[2] = "round";
  }

  /**
   * @notice Get the table's value field names.
   * @return fieldNames An array of strings with the names of value fields.
   */
  function getFieldNames() internal pure returns (string[] memory fieldNames) {
    fieldNames = new string[](1);
    fieldNames[0] = "times";
  }

  /**
   * @notice Register the table with its config.
   */
  function register() internal {
    StoreSwitch.registerTable(_tableId, _fieldLayout, _keySchema, _valueSchema, getKeyNames(), getFieldNames());
  }

  /**
   * @notice Register the table with its config.
   */
  function _register() internal {
    StoreCore.registerTable(_tableId, _fieldLayout, _keySchema, _valueSchema, getKeyNames(), getFieldNames());
  }

  /**
   * @notice Get times.
   */
  function getTimes(address tokenAddr, uint256 tokenId, uint256 round) internal view returns (uint256 times) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint256(bytes32(_blob)));
  }

  /**
   * @notice Get times.
   */
  function _getTimes(address tokenAddr, uint256 tokenId, uint256 round) internal view returns (uint256 times) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint256(bytes32(_blob)));
  }

  /**
   * @notice Get times.
   */
  function get(address tokenAddr, uint256 tokenId, uint256 round) internal view returns (uint256 times) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint256(bytes32(_blob)));
  }

  /**
   * @notice Get times.
   */
  function _get(address tokenAddr, uint256 tokenId, uint256 round) internal view returns (uint256 times) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint256(bytes32(_blob)));
  }

  /**
   * @notice Set times.
   */
  function setTimes(address tokenAddr, uint256 tokenId, uint256 round, uint256 times) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((times)), _fieldLayout);
  }

  /**
   * @notice Set times.
   */
  function _setTimes(address tokenAddr, uint256 tokenId, uint256 round, uint256 times) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((times)), _fieldLayout);
  }

  /**
   * @notice Set times.
   */
  function set(address tokenAddr, uint256 tokenId, uint256 round, uint256 times) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((times)), _fieldLayout);
  }

  /**
   * @notice Set times.
   */
  function _set(address tokenAddr, uint256 tokenId, uint256 round, uint256 times) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((times)), _fieldLayout);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function deleteRecord(address tokenAddr, uint256 tokenId, uint256 round) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function _deleteRecord(address tokenAddr, uint256 tokenId, uint256 round) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    StoreCore.deleteRecord(_tableId, _keyTuple, _fieldLayout);
  }

  /**
   * @notice Tightly pack static (fixed length) data using this table's schema.
   * @return The static data, encoded into a sequence of bytes.
   */
  function encodeStatic(uint256 times) internal pure returns (bytes memory) {
    return abi.encodePacked(times);
  }

  /**
   * @notice Encode all of a record's fields.
   * @return The static (fixed length) data, encoded into a sequence of bytes.
   * @return The lengths of the dynamic fields (packed into a single bytes32 value).
   * @return The dynamic (variable length) data, encoded into a sequence of bytes.
   */
  function encode(uint256 times) internal pure returns (bytes memory, EncodedLengths, bytes memory) {
    bytes memory _staticData = encodeStatic(times);

    EncodedLengths _encodedLengths;
    bytes memory _dynamicData;

    return (_staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Encode keys as a bytes32 array using this table's field layout.
   */
  function encodeKeyTuple(address tokenAddr, uint256 tokenId, uint256 round) internal pure returns (bytes32[] memory) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(tokenAddr)));
    _keyTuple[1] = bytes32(uint256(tokenId));
    _keyTuple[2] = bytes32(uint256(round));

    return _keyTuple;
  }
}
