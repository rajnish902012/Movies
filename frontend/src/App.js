import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import MovieList from "./components/Movies/MovieList";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Button } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import moment from "moment";
import ModalForm from "./components/Movies/Forms/ModalForm";
import "./App.css";
import { MySearch } from "./components/Search";
import { GenreFilter } from "./components/Filter";

const { Header, Content } = Layout;

const config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }],
};

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [edit, setedit] = useState(null);
    const [loading, setloading] = useState(false);
    const [genreId, setGenreId] = useState("");

    async function fetchMovies() {
        let response = await fetch("http://localhost:8080/api/movies");
        response = await response.json();
        console.log(response, "shbsjfb")
        if (response != null) {
            setMovies(response);
        } else alert(response.error.message);
    }

    async function fetchGenres() {
        let response = await fetch("http://localhost:8080/api/genre");
        response = await response.json();
        console.log(response, "shbsjfb")
        if (response != null) {
            setGenres(response.data);
        } else alert(response.error.message);
    }

    useEffect(() => {
        fetchGenres();
        fetchMovies();
    }, [loading]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // addMovie();
    };

    const handleCancel = () => {
        setedit(null);

        setIsModalVisible(false);
    };
    async function addMovie(values) {
        setloading(true);
        let response = await fetch("http://localhost:8080/api/movies", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        if (response!= null) {
            setIsModalVisible(false);
            setloading(false);
        } else alert(response.error.payload || response.error.message);
    }

    async function editMovie(values) {
        setloading(true);

        const editBody = { ...values};
        let response = await fetch(
        `http://localhost:8080/api/movies/${edit.id}`,
        {
            method: "PATCH",
            body: JSON.stringify(editBody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response!=null) {
            setloading(false);
            setedit(null);
        } else alert(response);
    }

    const onFinish = (values) => {
        values = {
            ...values,
            releaseDate: moment(values.releaseDate).format(
                "YYYY-MM-DD"
            ),
        };

        if (edit) {
            editMovie(values);
        } else {
            addMovie(values);
        }
    };

    const onFinishFailed = (errorInfo) => {
        alert("Failed:", errorInfo);
    };

    async function searchMovies(x) {
        const url = `http://localhost:8080/api/movies?title=${x}`

        let response = await fetch(url);
        response = await response.json();
        if (response!=null) {
            setMovies(response);
        } else alert(response.error.message);
    }

    async function filterMovies(genre) {
        let response = await fetch(
            `http://localhost:8080/api/movies?genre=${genre}`
        );
        response = await response.json();
        if (response!=null) {
            setMovies(response);
        } else alert(response.error.message);
    }

    const handleSearch = (s) => {
        searchMovies(s.target.value);
    };
    const handleFilter = (s) => {
        setGenreId(s);
        filterMovies(s);
    };

    return (
        <section className={"container"}>
            <header className={"header"}>
                <h1 className={"title"}>Movies</h1>
                <GenreFilter
                    filterBy={handleFilter}
                    className={"action"}
                    genres={genres}
                />
                <Button
                    type="primary"
                    shape="circle"
                    icon={<RetweetOutlined />}
                    style={{ margin: "0px 8px" }}
                    onClick={() => {
                        setGenreId("");
                        fetchMovies();
                    }}
                />
                <MySearch onSearch={handleSearch} className={"action"} />
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{
                        padding: "0 50px",
                        margin: "16px",
                        float: "right",
                    }}
                >
                    Add Movie
                </Button>
            </header>
            <MovieList
                movies={movies}
                setedit={setedit}
                setloading={setloading}
            />
            <ModalForm
                isModalVisible={isModalVisible}
                edit={edit}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                config={config}
                genres={genres}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />{" "}
        </section>
    );
};

export default App;
