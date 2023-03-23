import { db } from "../firebase"
import { types } from "../types/types";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { messageSweetAlert } from "../helpers/helpers";

export const startNewCommentOrEdit = (action, id, body) => {
	return async (dispatch, getState) => {
		const { value: name } = await Swal.fire({
			input: "text",
			inputValue: action === "add" ? null : body,
			inputPlaceholder: "Type your name",
			title: "Name",
			inputAttributes: {
				"aria-label": "Type your name here",
			},
		});
		const { value: comment } = await Swal.fire({
			input: "textarea",
			inputValue: action === "add" ? null : body,
			inputPlaceholder: "Type your comment",
			title: "Comment",
			inputAttributes: {
				"aria-label": "Type your comment here",
			},
			showCancelButton: true,
		});
		// const { value: comment } = await Swal.fire({
		// 	title: 'Multiple inputs',
		// 	showCancelButton: true,
		// 	inputValue: action === "add" ? null : body,
		// 	html:
		// 		'Name: <input id="swal-input1" type="textarea">' +
		// 		'Comment: <input id="swal-input2" type="text">',
		// 		focusConfirm: false,
		// 		preConfirm: () => {
		// 		return [
		// 			document.getElementById('swal-input1').value,
		// 			document.getElementById('swal-input2').value
		// 		]
		// 	}
		// });

		if (name && comment) {
			const { uid } = getState().auth;

			if (action === "add") {
				const newComment = {
					userId: uid,
					username: name,
					body: comment,
					date: new Date().getTime(),
					//  usersWhoVoted: [],
					//  opinions: [],
				};

				try {
					await db.collection(`guestbook`).add(newComment);
					messageSweetAlert("success", "Comment added, thanks! :)");
				} catch (error) {
					messageSweetAlert(
						"error",
						`Something went wrong... :( || Error: ${error}`
					);
				}
			} else {
				try {
					await db.collection(`guestbook`).doc(id).update({
						body: comment,
					});
					messageSweetAlert("success", "Comment edited.");
				} catch (error) {
					messageSweetAlert(
						"error",
						`Something went wrong... :( || Error: ${error}`
					);
				}
			}
		}
	};
};
// export const startNewOpinion = (id, opinionsInDB, opinionToAdd) => {
// 	return async (dispatch, getState) => {
// 		const { uid, username } = getState().auth;

// 		const newOpinion = {
// 			userId: uid,
// 			username: username,
// 			body: opinionToAdd,
// 			date: new Date().getTime(),
// 		};

// 		opinionsInDB.push(newOpinion);

// 		try {
// 			await db.collection(`guestbook`).doc(id).update({
// 				opinions: opinionsInDB,
// 			});
// 			messageSweetAlert("success", "Opinion added, thanks! :)");
// 		} catch (error) {
// 			messageSweetAlert(
// 				"error",
// 				`Something went wrong... :( || Error: ${error}`
// 			);
// 		}
// 	};
// };

export const startDeleteComment = (idComment) => {
	return (dispatch) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then(async (result) => {
				if (result.value) {
					await db.collection("guestbook").doc(idComment).delete();

					Swal.fire(
						"Deleted!",
						"Your comment has been deleted.",
						"success"
					);
				}
			});
		} catch (error) {
			messageSweetAlert(
				"error",
				`Something went wrong... :( || Error: ${error}`
			);
		}
	};
};

// export const startVoteComment = (idComment, usersWhoVoted, action) => {
// 	return async (dispatch) => {
// 		try {
// 			await db.collection("guestbook").doc(idComment).update({
// 				usersWhoVoted: usersWhoVoted,
// 			});
// 			if (action === "add") {
// 				dispatch(addVoteComment(idComment, usersWhoVoted));
// 			} else {
// 				dispatch(removeVoteComment(idComment, usersWhoVoted));
// 			}
// 		} catch (error) {
// 			messageSweetAlert(
// 				"error",
// 				`Something went wrong... :( || Error: ${error}`
// 			);
// 		}
// 	};
// };

export const loadComments = (comments) => ({
	type: types.commentsLoad,
	payload: comments,
});

export const loadCommentAndOpinions = () => ({
	type: types.commentsAndOpinionsLoad,
});

// export const addVoteComment = (id, usersWhoVoted) => ({
// 	type: types.commentsVoteAdd,
// 	payload: {
// 		id,
// 		usersWhoVoted,
// 	},
// });

// export const removeVoteComment = (id, usersWhoVoted) => ({
// 	type: types.commentsVoteRemove,
// 	payload: {
// 		id,
// 		usersWhoVoted,
// 	},
// });

export const commentActive = (comment) => ({
	type: types.commentsActive,
	payload: comment,
});

export const commentActiveClean = () => ({
	type: types.commentsActiveClean,
});

export const commentsLogout = () => ({
	type: types.commentsCleanLogout,
});
