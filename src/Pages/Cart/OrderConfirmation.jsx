import React, { useEffect, useState } from "react";
import UseThisUser from "../../Hooks/UseThisUser";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";

const OrderConfirmation = () => {
  const [items, setItem] = useState([]);
  const { client, clientLoading } = UseThisUser();

  useEffect(() => {
    if (!clientLoading) {
      const storedData = localStorage.getItem("orderItem");
      const orderItem = JSON.parse(storedData);
      setItem(orderItem?.items);

      // Check if client data is available and if it has the address property
      if (client && client.address && Object.keys(client.address).length > 0) {
        // Client data is available and has the address property
        // Proceed with order confirmation
        console.log("Client Address:", client.address);
      } else {
        // Show warning and prompt user to add address
        Swal.fire({
          title: "",
          text: "You have to add an address to place the order",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Step Forward"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace(`/users/${client?.name}`);
          }
        });
      }
    }
  }, [client, clientLoading]);

  if (clientLoading) {
    return <CustomLoader></CustomLoader>
  }

  return (
    <div>
      <Toaster />
    </div>
  );
};


export default OrderConfirmation;
