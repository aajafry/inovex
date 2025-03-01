/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import useSWR from "swr";
import Column from "./Column";

const URL = `${process.env.ORDERS_ENDPOINT}/update`;

export default function KanbanBoard({ orders }) {
  const [ongoing, setOngoing] = useState([]);
  const [process, setProcess] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setOngoing(orders?.filter((order) => order?.status == "Ongoing"));
    setProcess(orders?.filter((order) => order?.status == "Process"));
    setCompleted(orders?.filter((order) => order?.status == "Completed"));
  }, [orders]);

  const authToken = useSelector((state) => state.authToken.token);
  // Use SWR to fetch data
  const { data: updatedOrder, error, mutate } = useSWR([URL, authToken]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    let order = findItemById(draggableId, [
      ...ongoing,
      ...process,
      ...completed,
    ]);
    setNewState(destination.droppableId, order, draggableId);
  };

  function deletePreviousState(sourceDroppableId, orderId) {
    switch (sourceDroppableId) {
      case "1":
        setOngoing(removeItemById(orderId, ongoing));
        break;
      case "2":
        setProcess(removeItemById(orderId, process));
        break;
      case "3":
        setCompleted(removeItemById(orderId, completed));
        break;
    }
  }

  async function setNewState(destinationDroppableId, order, orderId) {
    let updatedOrder;
    switch (destinationDroppableId) {
      case "1":
        updatedOrder = { ...order, status: "Ongoing" };
        setOngoing([updatedOrder, ...ongoing]);
        break;
      case "2":
        updatedOrder = { ...order, status: "Process" };
        setProcess([updatedOrder, ...process]);
        break;
      case "3":
        updatedOrder = { ...order, status: "Completed" };
        setCompleted([updatedOrder, ...completed]);
        break;
    }
    // update or sync data with api.
    try {
      const response = await axios.put(`${URL}/${orderId}`, updatedOrder, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      // If successful, update the data with SWR
      mutate(response?.data, false);
    } catch (error) {
      console.error("Error submitting form:", error?.message);
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item?._id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item?._id != id);
  }

  return (
    <Box className="mt-2 mx-2 mb-24">
      <Box className="w-full flex justify-around gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Column title={"Ongoing"} orders={ongoing} id={"1"} />
          <Column title={"Process"} orders={process} id={"2"} />
          <Column title={"Completed"} orders={completed} id={"3"} />
        </DragDropContext>
      </Box>
    </Box>
  );
}
