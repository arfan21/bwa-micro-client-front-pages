import React from "react";
import Accordion, { Item, IconPlay, IconLock } from "src/components/Accordion";
import Modal from "src/components/Modal";
import YouTube from "react-youtube";

export default function RenderPreviews({ previews }) {
    return (
        <div className="accordion">
            <Accordion>
                {(Active, toggle) => {
                    return previews?.map((item, index) => {
                        return (
                            <Item
                                id={item.id}
                                name={item.name}
                                child={item.lessons}
                                active={Active}
                                toggle={toggle}
                                key={`${index}-${item.id}`}
                            >
                                {item?.lessons?.length > 0 &&
                                    item.lessons.map((child, index2) => {
                                        <div
                                            key={`${index2}-${child.id}`}
                                            className="relative  hover:bg-gray-200 flex justify-between items-center pl-8 pr-4 py-2"
                                        >
                                            <span className="text-gray-600">
                                                {child?.name ?? "Course Name"}
                                            </span>
                                            {index2 === 0 && (
                                                <Modal
                                                    content={(toggleModal) => (
                                                        <YouTube
                                                            videoId={
                                                                child?.video
                                                            }
                                                            id={child?.video}
                                                            opts={{
                                                                playerVars: {
                                                                    autoplay: 1,
                                                                    controls: 1,
                                                                    showinfo: 1,
                                                                },
                                                            }}
                                                        ></YouTube>
                                                    )}
                                                >
                                                    {(toggleModal) => (
                                                        <span
                                                            className="link-wrapped"
                                                            onClick={
                                                                toggleModal
                                                            }
                                                        ></span>
                                                    )}
                                                </Modal>
                                            )}
                                            {index2 === 0 && (
                                                <IconPlay
                                                    className="fill-teal-500"
                                                    width={20}
                                                    height={20}
                                                ></IconPlay>
                                            )}

                                            {index2 !== 0 && (
                                                <IconLock></IconLock>
                                            )}
                                        </div>;
                                    })}
                            </Item>
                        );
                    });
                }}
            </Accordion>
        </div>
    );
}
