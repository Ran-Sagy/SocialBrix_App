import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import { useDispatch } from "react-redux";
import { setFetchingStage } from "../../actions/fetching.actions";
import { getUserBricks } from "../../Services/bricksService";

const Analytics = ({ user }) => {
  const dispatch = useDispatch();
  const [userBricks, setUserBricks] = useState([]);

  const options = () => {
    if (userBricks) {
      let options = [];
      userBricks.map((brick) =>
        options.push({
          value: brick.type,
          label: brick.type,
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake",
                },
              ],
            },
          ],
        })
      );
      return options;
      // return [
      //   {
      //     value: "zhejiang",
      //     label: "Zhejiang",
      //     children: [
      //       {
      //         value: "hangzhou",
      //         label: "Hangzhou",
      //         children: [
      //           {
      //             value: "xihu",
      //             label: "West Lake",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ];
    }
  };

  useEffect(() => {
    const fetchUserBricks = async () => {
      dispatch(setFetchingStage(true));
      const userEmail = { email: user.email };
      const response = await getUserBricks(userEmail);
      console.log("user bricks: ", response);
      setUserBricks(response.data.Bricks);
      dispatch(setFetchingStage(false));
    };

    fetchUserBricks();
  }, [dispatch, user]);
  function onChange(value) {
    console.log(value);
  }

  // Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1];
  }

  return (
    <div>
      {userBricks && (
        <Cascader
          options={options()}
          expandTrigger="hover"
          displayRender={displayRender}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Analytics;
