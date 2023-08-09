import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selecttotalOrder,
  updateOrderAsnyc,
} from "../../order/orderSlice";
import { useEffect, useState } from "react";
import { PencilIcon, EyeIcon ,ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/20/solid";
import { discountedPrice } from "../../../app/constants";
import Pagination from "../../common/Pagination";
const AdminOrders = () => {
  const [page, setpage] = useState(1);
  const [sort, setsort] = useState({});

  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selecttotalOrder);
  const [editableicon, seteditableicon] = useState(-1);

  const handlePage = (page) => {
    setpage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    handlePage(page);
    dispatch (fetchAllOrdersAsync({ sort , pagination }));
  }, [dispatch, page, sort]);

  const handleEdit = (order) => {
    seteditableicon(order.id);
  };
  const handleUpdate = (e, order) => {
     
    const newOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsnyc(newOrder));
    seteditableicon(-1);
  };

  const handleshow = () => {
    console.log("show");
  };
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption .order };
    console.log(sort)
    setsort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatch":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "canceled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <div>
      <>
    
       
        <div className="overflow-x-auto">
          <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full ">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th
                        onClick={(e) =>
                          handleSort({
                            sort: "id",
                            order: sort._order == "asc" ? "desc" : "asc",
                          })
                        }
                        className="py-3 cursor-pointer px-6  text-left"
                      >
                        Order No { sort._sort == "id" && sort._order == "asc" ? <ArrowUpIcon className=" inline w-4 h-4"/>
                       : <ArrowDownIcon className="w-4 inline h-4"/>}
                      </th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th
                        onClick={(e) =>
                          handleSort({
                            sort: "totalAmount",
                            order: sort._order == "asc" ? "desc" : "asc",
                          })
                        }
                        className="py-3 cursor-pointer px-6  text-left"
                      >
                        TotalAmount { sort._sort == "totalAmount" && sort._order == "asc" ? <ArrowUpIcon className=" inline w-4 h-4"/>
                       : <ArrowDownIcon className="w-4 inline h-4"/>}
                      </th>
                      <th className="py-3 px-6 text-center">Address</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders?.map((order) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium">{order._id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order?.items?.map((item) => (
                            <>
                              {" "}
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                  />
                                </div>
                                <span>
                                  {item.product.title} - {item.quantity} - $
                                  {discountedPrice(item)}
                                </span>
                              </div>{" "}
                            </>
                          ))}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            ${order.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div>
                            <strong> ${order?.selectedAddress?.name}, </strong>
                            <div>{order?.selectedAddress?.street},</div>
                            <div> {order?.selectedAddress?.city},</div>
                            <div> {order?.selectedAddress?.state},</div>
                            <div> {order?.selectedAddress?.pinCode},</div>
                            <div> {order?.selectedAddress?.phone},</div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {editableicon === order.id ? (
                            <select onChange={(e) => handleUpdate(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="dispatch">Dispatch</option>
                              <option value="delivered">Delivered</option>
                              <option value="canceled">Canceled</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(
                                order.status
                              )} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <EyeIcon
                                onClick={(e) => handleshow(order)}
                                className="w-6 h-4"
                              ></EyeIcon>
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <PencilIcon
                                onClick={(e) => handleEdit(order)}
                                className="w-6 h-4 mr-2"
                              ></PencilIcon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
            handlePage={handlePage}
            page={page}
            setpage={setpage}
            totalItems={totalOrders}
          />
        </div>
      </>
    </div>
  );
};

export default AdminOrders;
