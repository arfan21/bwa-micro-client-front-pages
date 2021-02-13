import React, { useState, useRef, useEffect } from "react";

import courses from "src/constants/api/courses";
import Head from "next/head";
import Footer from "src/parts/Footer";
import Link from "next/link";
import Header from "src/parts/Header";
import ListCourses from "src/parts/ListCourses";

export default function Courses({ data }) {
    const [Search, setSearch] = useState(() => "");
    const [SearchOnFocus, setSearchOnFocus] = useState(() => false);
    const [SearchResponse, setSearchResponse] = useState(() => ({
        isLoading: false,
        isError: false,
        data: [],
    }));

    let timeoutSearch = useRef(null);

    const handleSearch = (e) => {
        e.persist();
        setSearch(e.target.value);
        clearTimeout(timeoutSearch.current);
        setSearchResponse({ isLoading: true, isError: false, data: [] });
        timeoutSearch.current = setTimeout(() => {
            courses
                .all({ params: { q: e.target.value } })
                .then((res) => {
                    setSearchResponse({
                        isLoading: false,
                        isError: false,
                        data: res.data,
                    });
                })
                .catch((err) => {
                    setSearchResponse({
                        isLoading: false,
                        isError: true,
                        data: [],
                    });
                });
        }, 1000);
    };

    const selectWrapper = useRef(null);

    const clickOutside = (e) => {
        if (selectWrapper && !selectWrapper.current.contains(e.target)) {
            setSearch("");
        }
    };

    useEffect(() => {
        window.addEventListener("mousedown", clickOutside);
        return () => {
            window.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Micro | Courses</title>
            </Head>
            <section className="pt-10 z-30 relative" style={{ height: 360 }}>
                <div className="absolute inset-0 w-full h-full bg-black opacity-75"></div>
                <div
                    className="meta-title absolute bottom-0 object-fill z-0 w-full flex justify-center items-center"
                    style={{ marginBottom: "-25px" }}
                >
                    <div>
                        <h3 className="text-6xl text-center text-teal-500 font-semibold">
                            Library
                        </h3>
                        <h4 className="text-lg text-center text-white">
                            Jangan mau kalah update dengan yang lainnya. <br />{" "}
                            Yuk ikuti perkembangan teknologi.
                        </h4>
                        <div className="flex-col relative" ref={selectWrapper}>
                            <input
                                id="q"
                                type="text"
                                onChange={handleSearch}
                                onFocus={() => setSearchOnFocus(!SearchOnFocus)}
                                onBlur={() => setSearchOnFocus(!SearchOnFocus)}
                                value={Search}
                                placeholder={
                                    SearchOnFocus
                                        ? "Ketik minimal 3 karakter untuk mencari"
                                        : "Lagi mencari kelas apa ?"
                                }
                                className="bg-white focus:outline-none transition-all duration-200 border focus:border-teal-500 border-gray-600 px-4 py-3 w-full mt-6"
                            />
                            {Search.length >= 3 && (
                                <div
                                    className="flex flex-col absolute py-2 px-4 bg-white border border-gray-600 w-full"
                                    style={{ top: 75 }}
                                >
                                    {SearchResponse.isLoading ? (
                                        "Loading..."
                                    ) : (
                                        <>
                                            {SearchResponse.isError &&
                                                "Something is technically wrong"}
                                            {SearchResponse.data?.length > 0
                                                ? SearchResponse.data?.map(
                                                      (item, index) => (
                                                          <div
                                                              key={index}
                                                              className="flex items-center -mx-4 py-2 cursor-pointer hover:bg-gray-200 relative"
                                                          >
                                                              <div
                                                                  className="w-auto px-4"
                                                                  style={{
                                                                      width: 150,
                                                                  }}
                                                              >
                                                                  <img
                                                                      src={
                                                                          item?.thumbnail ??
                                                                          ""
                                                                      }
                                                                      alt={
                                                                          item?.name ??
                                                                          "Course Name"
                                                                      }
                                                                  />
                                                              </div>
                                                              <div className="w-full px-4">
                                                                  <h6 className="text-gray-900 text-lg">
                                                                      {item?.name ??
                                                                          "Course Name"}
                                                                  </h6>
                                                                  <p className="text-gray-600">
                                                                      {item?.level ??
                                                                          "Level"}
                                                                  </p>
                                                                  <Link
                                                                      href="/courses/[id]"
                                                                      as={`/courses/${item.id}`}
                                                                  >
                                                                      <a className="link-wrapped"></a>
                                                                  </Link>
                                                              </div>
                                                          </div>
                                                      )
                                                  )
                                                : "No courses found"}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container z-10 mx-auto relative">
                    <Header></Header>
                </div>
            </section>
            <section className="container mx-auto pt-24">
                <ListCourses data={data}></ListCourses>
            </section>
            <section className="mt-24 bg-indigo-1000 py-12">
                <Footer></Footer>
            </section>
        </>
    );
}

Courses.getInitialProps = async () => {
    try {
        const data = await courses.all();

        return { data: data.data };
    } catch (error) {
        console.log(error);
        return { data: null };
    }
};
