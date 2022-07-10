import { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
const MovieList = ({ movies, setedit, setloading }) => {
    const deleteMovie = async function fetchMovies(id) {
        setloading(true);
        let response = await fetch(
            `http://localhost:8080/api/movies/${id}`,
            {
                method: "DELETE",
            }
        );
        if (response.status === 204) {
            console.log(response);

            // setIsModalVisible(false);
        } else alert(response);

        setloading(false);
    };
    // fetchMovies();

    const columns = [
        {
            title: "Name",
            dataIndex: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Rating",
            dataIndex: "rating",
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            sorter: (a, b) => a.releaseDate.localeCompare(b.releaseDate),
        },
        {
            title: "Actions",
            dataIndex: "id",
            key: "actions",
            render: (id, record) => {
                return (
                    <>
                        <span style={{ marginRight: "16px" }}>
                            <EditOutlined
                                onClick={(e) => {
                                    // e.preventDefault();
                                    console.log(id, record);
                                    record = {
                                        ...record,
                                        genre: record.genre,
                                        releaseDate: moment(
                                            record.releaseDate
                                        ),
                                    };
                                    setedit(record);
                                }}
                            />
                        </span>
                        <span style={{ marginRight: "16px" }}>
                            <DeleteOutlined
                                onClick={() => deleteMovie(id)}
                            />
                        </span>
                    </>
                );
            },
        },
    ];

    console.log(movies);
    return <Table columns={columns} dataSource={movies} />;
};

export default MovieList;
